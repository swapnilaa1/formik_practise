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

*/

import { ErrorMessage, Field, Form, FieldArray, Formik, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";
const initialValues = {
  name: "",
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
const onSubmit = (values) => {
  console.log("form _data", values);
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
  return (
    <Formik
      className="container"
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="from-group container ">
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
                <ErrorMessage name="channel" component={TextError} />
                </div>

                <div className="mb-3">
                <label htmlFor="comments" className="form-label">Comments </label>
                <Field type="text" className="form-control" id="comments" name="comments" as="textarea"/>
                <ErrorMessage name="comments" />
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
                <Field name="address" className="form-control">
                    {
                        props => {
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
                </Field>
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
                    console.log("FieldArrayProps : " ,FieldArrayPrps);
                    const { push , remove , form}=FieldArrayPrps;
                    const { values} =form;
                    const { phNumbers}=values;
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
                
                
        <button type="submit" className="btn btn-danger">Submit</button>
      </Form>
    </Formik>
  );
};

export default SimplfiedYoutube;
