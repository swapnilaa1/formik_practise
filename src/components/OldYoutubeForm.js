import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
const initialValues = {
  name: "", //1... initialvalues contians the keys and those keys should be as same as the name attrubutes which are
  email: "", // there in the each input field..
  channel: "",
};
const onSubmit = (values) => {
  console.log("form _data", values); // 5.. calling handleSubmit handler will give us a property and that is a method..
  // onSubmit.... ///which will give us values....
  //and those values are nothing but the state of whole form field..
};
const validate = (values) => {
  let errors = {};
  //values=> values.name values.email values.channel
  //errors=> errors.name values.email errors.channel
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
name : Yup.string().required('Required!'), /////schema1 
email : Yup.string().email("inavalid email format").required("required"),
channel : Yup.string().required("Required")
}) 
/* 9..
here we are creating a variable that is validation schema and to that we are assigning an object schema that is Yup.object
and this also recieves an object.
and this object is nothing but the rules that should be satisfied for each input field..
10...
schema1 : how to decode this line 
name : Yup.string().required('Required')
means name is required and it should be a string and if this fails then a string should be displayed..that is ('Required')

*/
const OldYoutubeForm = () => {
  let formik = useFormik({
    initialValues,
    onSubmit,
    //validationSchema
    validate,
    /*
    10..
    here in place of validate function we are using validationSchema thats why we are commenting the validate function and the
    validationschema works same as validate function but this yup gives us validation facility*/
  });
  console.log("formik errors" , formik.errors);
  console.log("visited fields" , formik.touched);
  //console.log("formik values " ,formik.values ); //2. this will show us all input fields state...
  return (
    <div className="container ">
      <form className="from-group " onSubmit={formik.handleSubmit}>
        {/*4....
        like pt 3.. as we have used onChange function ..
        here also for form submission we use handleSubmit function that is a handler which is predefined and we will 
        call it for onSubmit event..
        */}
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label"
            style={{ textAlign: "right" }}
          >
            name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="alert alert-warning" role="alert">
              {formik.errors.name}
            </div>
          ) : null}
          {/* 6... onBlur={formik.handleBlur}..
          this line gives us boolean values for each field if it is visited..
          if Visited then it is true and not then it is false..
          we can console and see clg(formik.touched)..

          */}
            {/*7... so our aim is that we want to display the error msgs after we visit the input field ..
          formik.touched.name .email .channel gives us true or false value.. 
          so when we come out of the input box then only we get the error msg displyed...*/}
          {/* 3...
        name , onchange and value attributes are must to mention..
        see .. we are calling by formik.handlechange on Onchange.. as this handler will automatically run 
        its predefined..
        and in value attribute here.. formik.values.name .. this means name attribute that is in each input field...
        
        */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
        
          {formik.touched.email && formik.errors.email ? (
            <div className="alert alert-warning" role="alert">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="channel" className="form-label">
            Channel
          </label>
          <input
            type="text"
            className="form-control"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            value={formik.values.channel}
            onBlur={formik.handleBlur}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="alert alert-warning" role="alert">
              {formik.errors.channel}
            </div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OldYoutubeForm;
