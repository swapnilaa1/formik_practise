/*
lecture 22. field Array ..
in previous video we have seen that for multiple phone numbers we created that many fields but we want that..
user will have one field for entering a phone number then user will decide to add more numbers 
for this we will use field array method...

1. import FieldArray from formik
2. then we will create an array phNumbers which will have an single element which is an empty string..
3. and in return we will use render prop method ..
    we know the render props method we can write jsx code here.. and this gives us a way to write a arrow function 
    and arraw function gives us a thing and that is FieldArrayProps...
    we can console.log and see what FieldArrayProps provides us...
    so there are many methods and objects that we get through fieldArrayProps...
    among them we will see push pop remove and ..
    we see we have form object here and if we click it we get values and in values we can see the all initialValues here..
    so we can manipuate them here..

lecture 23.. FastField...
this works like componentShouldUpdate...

genrally when we do not use FastField then 
even if we make change or write anywhere in any filed then all other fields also gets updated 
means other fields on small other updates rerender again and again ..
then if we want that some field shoulDnotupdate on each onchange then ...
for those coomponent we use this fastField components ..which does not allow the rerendering of the code again..
so in address field we have written the clgaddress rendered but as we use fastfield then that component will not rerendered 
on others updte but wil update on its own updtae..


lecture 24.. when the validation function runs...
.1..validation function runs on onchange of each fied..
.2.. on every fileds on blur... that is when we click inside and outside of the input field..
.3.. at every time when submit event occures..

but if we want that this validation should not occur on every onChange and on every fields onblur 
then in formik component call in return we have to provide props
1.. validateOnChange={false} // for change
2.. validateOnBlur={false} //for onblur

in this case only the errors state will not get updated...

lecture 25... field level validation..
for validation we have seen the two ways 
1. validate function that recives errors for all the fields.. and we set error msg for each field and returns the msg..
2. yup validation..

now we can add field level validation also ...
means for each field we can have field level validation 

step 1..for e.g. for comments section  we want to add validation..
then create a validateComments function which recieves values and using those values we can set the error msg...
step 2..
mention that function in validate attribute in field component 
step 3..
then set errormsg component..

lecture 26... manually triggering validation..
we have seen that using 3 methods for validation which we learned in previous lecture ..
the validation occurs automatically ...
but we want that validation should be done manually ..
then ..
step 1..
we have to apply render prop pattern on entire form ... for this..
as we know in render props pattern we write arrow function in it ... and this gives us some thing..
so when we apply render prop on formik component then this gives us the control of entire form..
and we know in render prop we return something so in this case we will return the entire form but in form we can make 
use of what the prop has given us here
...
step 2..
console log the formik ... that is prop we have got in this case ..then we get to see some properties adn
methods which we are familiar of ..like onBlur , touched etc...
so here we will focus on 
setTouched,
setTouchedField
touched
validateForm
validateField..
so we have used 4 button here ..
2 button will have validateForm validateField.. this functionalities..but if we see console.log formik the 
touched property will not have true value for any field thts why in any of this we will not see the error msg
rendered...
but for this we have to mention the type of button as button else the touched value wil be true...

but if we use other 2 methods setTouched,setTouchedField here we have to set the touched values true for those
we want to get them to be true this way we can achieve the manually triggering of each fields validation..

lecture 27 ... disable the submit button 
there are 2 scenario when we can disable the submit button.
1.validity of the form state..
2.form submission in progress..

1.validity of the form state..

in this way we can disable the submit button when formik object isValid is false..
so when this property will be set to false..?

here if we see on page load there are no error in formik props... that we have used in render props pattern..
and if we check isValid property then this also is true...
means when there are no errors then isValid is true..

so on this submit button we have to set disabled attribute ... that disabled should be dependent on isValid 
so disabled={!formik.isValid} this line will decide to hide the functionality of this submit button .
and when there are no errors then this button will be disabled..
we can check this functionality using onBlur functionality...

limitation 1 : this has the limitation that at the page load the isValid is true .. but we want that at page load also 
the validation should be done and the button should be disabled at this time ... 

solution 1: so we will write an property validateOnMount on Formik component..... this holds the boolean value..
so if this property will give us the validation on page load it self..

limitation 2: but using validateOnMount will validate the whole page even if the user havent entered anything ..
so this is useful when the form has very less fields but if there are may fields and we have placed validation 
that is complicated then this will take more time...

solution 2:
so  there is one more property which is dirty 
so on page load this dirty value is false and
this value gets true when any of the fields state gets changed...
so when the state of any field will change ..
when the initial value is changed then the state gets changed...
so
 disabled={!(formik.dirty && formik.isValid)}
  we will write this line on Submit button ..and will comment ot the validateOnMount 

  so this code will give us submit button  disabled on page load...

limitation 3:
suppose we place some initial values for each field and we want to continue with
those value but due to dirty property we will get the submit button disable at start ..
so we cannot proceed with the initial values 
2. even if we change the original values and again make the state with the same original value then also
the submit button will be diabled ... 

lecture 28..
here we will see how to disable the submit button while submittig the form ..
why we need this?

when we are submittin the form we will be calling the api .. and this is the time consuming way.. 
so while the data is fetching we want that submit button should be disabled and user should not click the
button again untill the data is fetched..

so formik props gives us a property for this and this is 
isSubmittnig so if isSubmitting is true then he submit button will be disabled.
disabled={formik.isSubmitting}
we will write this line..
and we click the submit button then we see the formik props then formik prop is rendered more than one time
and at first in formik prop the isSubmitting property is true.. and at last formik property it is false..
as we did not enetered any of the fields so there are errors so form will not be submitted and
isSubmitting is again false and submit button is enaled..

but what if set all the fields with some values then 
after submitting the form at the end the submit button is disabled ...

now see the scenario... we have submitted the form and still the isSubmitting is true ..
means this is telliing us the form is still being submitting ..

but in real api call the scenario will be different..

when the data fetching is completed then only the button should become enable ..
means manually we will make the button enable but ..
here we are not making any api call so 
we will set manually this button enable on Onsubmit functionality....

so onSubmit function recieves another props that is onSubmitProps
and if OnSUbmit if we check console.log the onSubmitProps then 
this will give us some properties..
so there is one property that is setSubmitting...
so here On onSubmit function we will set the isSubmitting to false..
then the button will be enabled again...

but in real scenario after data is fetched we will set this property manually..


lecture 29...
load saved data ..
suppose there is a scenario .. while submitting the form .
suppose we are filling the form and we saved the half form and again visited the filling form page and we want
to load the saved form again.. then we will do this scenario..

step 1 : create a global savedData object that will have save keys as the initialValue have...
and set SOme values..
step 2 : create a useState variable and 
step 3 : create a button ... on clicke of this button set the useState to the global savedDAta...
step 4 : initialValues={ formValues || initialValues}... set this.. either savedData or initialVavlue
saved values should be at first in this line...

lecture 30 : reset form
there are 2 scenario when we want to reset the form depends on when we want to reset the form ..
1. whenever user want to reset or
2. after submitting the one form.. and again the form should be empty so that user can make new entries...

1. for this we will add reset button and its type will be reset .. so this will reset the form back to original state

2. we will use onSubmit method of formik... 
in onSubmit we get Second parameter that is onSubmitProps
this has resetForm() function which will reset the form after the submission is completed..








*/

import { ErrorMessage, Field, Form, FieldArray, Formik, useFormik , FastField } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextError from "./TextError";
const initialValues = {
  name: "sawap",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social :
  {
    facebook : "",
    twitter: ""
  },
  phoneNumbers: ["" , ""],
  phNumbers: [""]
};

const savedValues = {
  name: "swarup",
  email: "swarup.shirke@own.com",
  channel: "yourchannel",
  comments: "hello",
  address: "khkhk",
  social :
  {
    facebook : "",
    twitter: ""
  },
  phoneNumbers: ["" , ""],
  phNumbers: [""]
};
const onSubmit = (values , onSubmitProps) => {
  console.log("form _data", values);
  console.log("on Submit props ", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};
const validateComments=(value)=>{
  let error ;
  if (!value) {
    error = "Required";
  }
  return error;
};
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Required";
  }
  return errors;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"), /////schema1
  email: Yup.string().email("inavalid email format").required("required"),
  channel: Yup.string().required("Required"),
});
const SimplfiedYoutube = () => {
  let [formValues , setFormValues]=useState(null);
  console.log("formvalues",formValues);
  return (
    <Formik
      className="container"
      initialValues={ formValues || initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    //  validateOnMount
    //  validateOnChange={false}
    // validateOnBlur={false}
    >
      {  formik=>{
        console.log("formik " , formik)
        return(<Form className="from-group container ">
        <div className="mb-3">
        <label htmlFor="name" className="form-label">name</label>
        <Field type="text" className="form-control" id="name" name="name" />
        <ErrorMessage name="name" component="div" /> 
        {/*
        here in ErrorMessage ...we have used component props
        suppose if we do not use this props and we inspect the page..then we can see that the errormassage is 
        displayed as Children but not in any html element..
        so when we use this component prop we can see error msg in html element 
        or we can display error msg using react component also ..
        see channel here we are using react component to display error msg ...
        and that component is TextError...
        */}
        </div>

        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
        <Field type="email" className="form-control" id="email" name="email"/>
        <ErrorMessage name="email" >
        {
            errorMsg =>{
                  return  <div >{errorMsg}</div>
            }
        }
        {/*
        here we are using render props ... this way is render props way ...
        here we use { jsx } and in that we use arrow function that gives us error msg...
        */}
        </ErrorMessage>
        </div>
        
        <div className="mb-3">
        <label htmlFor="channel" className="form-label">Channel </label>
        <Field type="text" className="form-control" id="channel" name="channel" />
        <ErrorMessage name="channel" component='div' />
        </div>

        <div className="mb-3">
        <label htmlFor="comments" className="form-label">Comments </label>
        <Field type="text" className="form-control" id="comments" name="comments" as="textarea" validate={validateComments}/>
        <ErrorMessage name="comments" component={TextError}/>
        </div>
        {/*1.
         here we have added a textarea as we have 4 options for as="textarea" 
        if we do not provide as attribute then this is bydefault input or we can provide
        select , input , textArea ,or custom component..
        2. other thing is that..
        if we provide other attributes to field component then is also gets added to it like 
        placeHolder="" .. such attributes also become the part of the component..*/}
        <div className="mb-3">

        <label htmlFor="address" className="form-label">Address </label>
        <FastField name="address" className="form-control">
            {
                props => {
                  console.log("address rendered");
                    const { field , form , meta }=props
                      //  console.log("render props" ,props);
                        return(
                        <div><input id="address" type="text" className="form-control" {...field}/>
                        { meta.touched && meta.error ?<div>{meta.error}</div>:null}</div>);
                }

            }{/*
see this code lec. no. 18.. here field is not self closing.. and in children we are passing jsx code which contains an arrow function and
this function returns an input element and that is not hooked with formik..
props => {
const { field , form , meta }=props
        }
        so we get field , form , meta this 3 things in props which helps us
        to hook this input to formik
        and meta helps us to get the error msgs.. 
        input type have to be specified....
        ..
        
            */}
        </FastField>
       {/*  <ErrorMessage name="comments" />*/}
        </div>

        {/* ...nested objects...*/}
        <div className="mb-3">
        <label htmlFor="facebook" className="form-label">Facebook </label>
        <Field type="text" className="form-control" id="facebook" name="social.facebook" />
        {/*
        <ErrorMessage name="channel" component={TextError} />*/}
        </div>
        
        <div className="mb-3">
        <label htmlFor="twitter" className="form-label">Twitter </label>
        <Field type="text" className="form-control" id="twitter" name="social.twitter" />
        {/*
        <ErrorMessage name="channel" component={TextError} />*/}
        {/*
        here we have added nested object .. see the name attribute here .. 
        name="social.twitter".. so for each nasted object we will we will use this concept...
        */}
        </div>

        {/* Phone numbers in array ...*/}
        <div className="mb-3">
        <label htmlFor="primaryPh" className="form-label">Primary Phone Number </label>
        <Field type="text" className="form-control" id="primaryPh" name="phoneNumbers[0]" />
        {/*
        <ErrorMessage name="channel" component={TextError} />*/}
        </div>

        <div className="mb-3">
        <label htmlFor="secondaryPh" className="form-label">Primary Phone Number </label>
        <Field type="text" className="form-control" id="secondaryPh" name="phoneNumbers[1]" />
        {/*
        <ErrorMessage name="channel" component={TextError} />*/}
        {/* here we have added phone number field and we have used array for this..
        for this
        1... we have crated a initial state as array and then in return we are rendering that state but 
        for this  we have used the initial state value ... and see the name attribute here
        we have taken empty array of string and then in name attibute we are mentioning the index..*/}
        </div>

          {/*for phone numbers..*/}
        <div className="mb-3">
        <label htmlFor="comments" className="form-label">Add Phone Numbers </label>
        <FieldArray name='phNumbers'>
          {
            (FieldArrayPrps)=>{
              console.log("phone num rendered");
            
            //console.log("FieldArrayProps : " ,FieldArrayPrps);
            const { push , remove , form}=FieldArrayPrps;
            const { values} =form;
            const { phNumbers}=values;
            console.log("errors" ,form.errors);
            return (phNumbers.map((phNumber , index)=>(
              <div  key={index}>
                  <Field name={`phNumbers[${index}]`} />
                  { index>0 && (<button className="btn btn-danger" onClick={()=>remove(index)}>{' '}-{' '}</button>) }
                  <button className="btn btn-primary" onClick={()=>push('')}>{' '}+{' '}</button>
              </div>
            ))
                    )
            }
          }
        </FieldArray>
   
        </div>
        <button  type="reset">Reset</button>
 <button onClick={()=>setFormValues(savedValues)} type="button">Load Saved Data</button>       
<button type="button" onClick={()=>formik.validateField('comments')} >Validate Comments</button>        
<button type="button" onClick={()=>formik.validateForm()} >Validate all</button>

<button type="button" onClick={()=>formik.setFieldTouched('comments')} >Validate Comments</button>        
<button type="button" onClick={()=>formik.setTouched({
  name:true,
  email:true,
  channel:true,
  comments:true
})} >Validate all</button>
<button type="submit" className="btn btn-danger"/*disabled={!(formik.dirty && formik.isValid)} for 1st way*/ 
disabled={formik.isSubmitting}
>Submit</button>
</Form>)
      }  
    }
      
    </Formik>
  );
};

export default SimplfiedYoutube;
