import { Row, Col, Form } from "react-bootstrap";
import "./vendorDashboard.css";
import { useDispatch, useSelector } from "react-redux";

import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import SideBar from "../sideBar/vendorSidebar";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import {
  addFileAction,
  createinvoiceAction,
  getGstTdsListAction,
} from "../../action/vendorAction";
import { toast } from "react-toastify";
import { getProfileAction } from "../../action/userAction";

const Createinvoice2 = (props) => {
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(true);
  const [alag, setAlag] = useState("partist");
  const [sidestyle, setSidestyle] = useState("sideopen");
  const [search, setSearch] = useState();
  const { vendorprofile } = useSelector((state) => state.getprofile);
  const [invfile, setInvfile] = useState("Choose File");
  const [doc1, setDoc1] = useState("Choose File");
  const { gst, tds, loading } = useSelector((state) => state.getgsttds);
  const [gstper, setGstper] = useState();
  const [tdsper, setTdsper] = useState();
  const { pathinvoice, pathdocs } = useSelector((state) => state.addfileinv);

  const initialValues = {
    customFile: "",
    description: "",
  };

  const toggle = () => {
    if (mobileOpen === true) {
      setMobileOpen(false);
      setAlag("bigpartist");
      setSidestyle("sideopen");
    } else {
      setMobileOpen(true);
      setAlag("partist");
      setSidestyle("sideclose");
    }
  };

  const gstpercentage = () => {
    if (!loading) {
      let ids;
      let gstid = gst && gst.list.map((data) => data);
      for (let i = 0; gst?.list.length > i; i++) {
        if (vendorprofile?.profile?.vendor?.gstId == gstid[i].id) {
          ids = gstid[i].gst;
        }
      }
      setGstper(ids);
    }
  };

  const tdspercentage = () => {
    if (!loading) {
      let ids;
      let tdsid = tds && tds.list.map((data) => data);
      for (let i = 0; tds?.list.length > i; i++) {
        if (vendorprofile?.profile?.vendor?.tdsId == tdsid[i].id) {
          ids = tdsid[i].tds;
        }
      }
      setTdsper(ids);
    }
  };

  const fileName = (name, e) => {
    if (name == "invoice") {
      setInvfile(e.target.files[0].name);
    } else if (name == "documents") {
      setDoc1(e.target.files[0].name);
    }
  };

  const handleFile = (name, e) => {
    const regex = /^.*\.(jpg|JPG|jpeg|JPEG|pdf|PDF|png|PNG)$/;
    if (regex.test(e.target.files[0]?.name)) {
      fileName(name, e);
      const data = new FormData();
      console.log("data before append , ", data);
      console.log("e target file ", e.target.files, e.target.files[0]);
      data.append("filename", e.target.files[0]);
      console.log("data after append", data);
      dispatch(addFileAction(data, name));
    } else {
      toast.error("Invalid file format");
    }
  };

  useEffect(() => {
    dispatch(getGstTdsListAction());
    dispatch(getProfileAction());
    gstpercentage();
    tdspercentage();
  }, []);

  const onSubmit = (values, onSubmitProps) => {
    console.log("form _data", values);
    console.log("on Submit props ", onSubmitProps);
    onSubmitProps.setSubmitting(false);
    //   onSubmitProps.resetForm();
  };
  console.log("pATH IN V", typeof pathinvoice);
  const validationSchema = Yup.object({
    email: Yup.string().email("inavalid email format").required("required"),
  });
  console.log("inv", invfile);
  return (
    <>
      <Navbar
        mobileOpen={mobileOpen}
        toggle={toggle}
        name={
          props.location.state ? props.location.state.name : "Create Invoice"
        }
        setSearch={setSearch}
        search={search}
      />
      <SideBar
        mobileOpen={mobileOpen}
        toggle={toggle}
        stylesname={sidestyle}
        name={
          props.location.state ? props.location.state.name : "Create Invoice"
        }
      />
      <div className={alag}>
        <div className="invoice-bottom-table22 widthss">
          <Row className="row_space">
            <Col className="header">
              <span className="table-title">Create Invoice</span>

              <div className="border-0 pt-1">
                <hr className="mt-1 bottom_borderColor_overview"></hr>
              </div>
            </Col>
          </Row>

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => {
              console.log("formik ", formik);
              return (
                <Form>
                  <Row className=" row_space">
                    <Col>
                      <label className="inv-label" htmlFor="customFile">
                        Upload Invoice (Upload a Signed Invoice Copy)
                      </label>
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          onChange={(e) => {
                            handleFile("invoice", e);
                            console.log("Swapnil", pathinvoice);
                            formik.setFieldValue("customFile", pathinvoice);
                          }}
                          /*onChange={(e) => handleFile("invoice", e)}*/
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {invfile}
                        </label>
                        <ErrorMessage name="customFile" component="div" />
                      </div>
                    </Col>
                  </Row>

                  <Row className="form_row row_space">
                    <Col>
                      <label className="inv-label"> Description </label>
                      <Field
                        type="text"
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="Invoice Description..."
                        className="input-area"
                      />
                    </Col>
                    <ErrorMessage name="email" component="div" />
                  </Row>

                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={formik.isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Createinvoice2;
