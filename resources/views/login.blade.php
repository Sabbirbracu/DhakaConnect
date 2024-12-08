<h1>User Signup</h1>
<!--@if($errors->any())
@foreach($errors->all() as $error)
<div>
    {{$error}}
</div>
@endforeach
@endif-->

@if(session('msg'))
<span class='success-msg'>{{session('msg')}}</span>
@endif
<?php // {{session()->keep('msg')}} ?>
{{session()->reflash()}}
<form action="adduser" method="POST">
    @csrf
    <div class="inputform">
        <input type="text" placeholder="Enter Username" name="username" value="{{old('username')}}"
        class="{{$errors->first('username')?'input-error':''}}">
        <span>@error('username'){{$message}}@enderror</span>
    </div>
    <div class="inputform">
        <input type="text" placeholder="Enter Email" name="email" value="{{old('email')}}"
        class="{{$errors->first('email')?'input-error':''}}">
        <span>@error('email'){{$message}}@enderror</span>
    </div>
    <div class="inputform">
        <input type="text" placeholder="Enter Job" name="job" value="{{old('job')}}"
        class="{{$errors->first('job')?'input-error':''}}">
        <span>@error('job'){{$message}}@enderror</span>
    </div>
   
    <h3>Skills : </h3>

    <div>
        <input type="checkbox" name="skill[]" value="PHP" id="php">
        <label for="php">PHP</php>
    </div>

    <div>
        <input type="checkbox" name="skill[]" value="Node" id="node">
        <label for="node">Node</php>
    </div>
    <div>
        <input type="checkbox" name="skill[]" value="Django" id="django">
        <label for="django">Django</php>
    </div>
    <span>@error('skill'){{$message}}@enderror</span>
    <h3>Age : </h3>
    <div>
        <input type="range" name="age" min="16" max="100">
</div>

    <button>Add New User</button>
</form>
<style>
    .input-error{
        border:1px red solid;
        color:red 

    }
</style>
<style>
    .success-msg{
        border:1px green solid;
        color:green 
    }
</style>
<h3>{{URL::full()}}</h3>
<h3>{{URL::current()}}</h3>
<h3>{{URL()->current()}}</h3>
<a href="/about">About Page</a>
<a href="{{URL::to('about')}}">About Page</a>
<a href="{{URL::to('about',['Zabid'])}}">About Zabid</a>


