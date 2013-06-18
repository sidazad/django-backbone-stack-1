#    Copyright (c) 2010-2013 VisionHatch Technologies
#    @author Sid Azad   Email: sidazad@gmail.com  Twitter: @sid_azad
#
#    Permission is hereby granted, free of charge, to any person obtaining
#    a copy of this software and associated documentation files (the "Software"),
#    to deal in the Software without restriction, including without limitation
#    the rights to use, copy, modify, merge, publish, distribute, sublicense,
#    and/or sell copies of the Software, and to permit persons to whom the Software
#    is furnished to do so, subject to the following conditions:
#
#    The above copyright notice and this permission notice shall be included in
#    all copies or substantial portions of the Software.
#
#    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
#    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
#    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
#    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
#    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
#    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
#    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


from django.http import HttpResponse, HttpResponseRedirect
from json_utils import *
from django.template import Context, loader
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render_to_response
import simplejson

from mongoengine.django.auth import *
from django.contrib.auth import authenticate
import traceback
from mongo_models import *


ERR_GENERAL="GENERAL_ERROR"
ERR_PARAMS="BAD_PARAMS"
ERR_USER_EXISTS="USER_EXISTS"

def createUser(username, password, email,first="",last=""):
    """Create (and save) a new user with the given username, password and
    email address.
    """
    now = datetime.datetime.now()
    # Normalize the address by lowercasing the domain part of the email
    # address.
    if email:
        try:
            email_name, domain_part = email.strip().split('@', 1)
        except ValueError:
            return None
        else:
            email = '@'.join([email_name, domain_part.lower()])
    else:return None
    user=DBBUser(username=username, email=email, date_joined=now)
    user.set_password(password)
    user.save()
    return user

def signup(request):
    try:
        datadict=request.POST
        if request.is_ajax() and request.method=='POST':
            datadict=simplejson.loads(request.raw_post_data)
        if not checkPostVarsDict(datadict,["username","password","nickname","roles"]):
            return HttpResponse(getJSONError(ERR_PARAMS,"missing params"),mimetype='application/javascript')
        email=datadict['username']
        if getUser(email)!=None:
            return HttpResponse(getJSONError(ERR_USER_EXISTS,"user already exists"),mimetype='application/javascript')
        nick=""
        nick=datadict['nickname'] if "nickname" in datadict else username.split("@")[0] 
        pwd=datadict['password']
        user=createUser(email, pwd, email)
        if not user:
            return HttpResponse(getJSONError("error","Could not create user"), mimetype='application/json')            
        stgs=UserSettings()
        stgs.user=user
        stgs.nick=nick
        stgs.save()
        return HttpResponse(okJSON(),mimetype='application/json')
    except Exception,ex:
        print traceback.print_exc()
        print ex.__str__()
    return stgs


def dologin(request):
    try:
        if request.user.is_authenticated():
            stgs=UserSettings.objects(user=request.user)
            return HttpResponse(okJSON("",{'nick':stgs[0].nick}),mimetype='application/json')
        datadict=request.POST
        if request.is_ajax() and request.method=='POST':
            datadict=simplejson.loads(request.raw_post_data)
        uname=datadict['username']
        pwd=datadict['password']
        user1=authenticate(username=uname,password=pwd)
        if user1:
            login(request,user1)
            stgs=UserSettings.objects(user=user1)
            return HttpResponse(okJSON("",{'nick':stgs[0].nick}),mimetype='application/json')
    except Exception,ex:
        print traceback.print_exc()
    return HttpResponse('error',mimetype='application/text')

def doLogout(request):
    logout(request)
    return HttpResponse(okJSON(),mimetype="application/javascript")

def index(request):
    t = loader.get_template('index.html')
    c = Context({'user':request.user})
    return HttpResponse(t.render(c))

def dashboard(request):
    return render_to_response('dashboard.mustache', { })

def loadTemplate(request):
    """
        Load and return a template in raw form (without parsing and rendering)
        Templates expected in paths such as templates/mytemplate.[html|mustache]
    """
    path=request.get_full_path()
    toks=path.split("templates/")
    tmpl=toks[-1].strip().replace("/","")
    loadedTmpl=loader.get_template(tmpl)
    return HttpResponse(loadedTmpl.getraw())
   
# helper methods
def retErr(type,msg):
    return HttpResponse(getJSONError(type, msg),mimetype="application/json")



def checkPostVars(request,vars):
    checkPostVarsDict(request.POST,vars)

def checkPostVarsDict(d,vars):
    """
        Check whether vars are present in request.POST
        @param l: list of strings: variables to check
    """
    for var in vars:
        if not var in d:
            return False
    return True
    
def checkGetVars(request,vars):
    """
        Check whether vars are present in request.GET
        @param l: list of strings: variables to check
    """
    for var in vars:
        if not var in request.GET:
            return False
    return True


def getUser(username):
    """
        Get user by username.
        @return: None if no user found, DBBUser otherwise
    """
    tmp=DBBUser.objects(username=username)
    if tmp==None or len(tmp)!=1:
        return None
    return tmp[0]




