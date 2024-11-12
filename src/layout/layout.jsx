import React from "react";
import Header from "./header";
import Nav from "./nav";
import Aside from "./aside";
import Footer from "./footer";
import '../App.css';

function Layout(props) {
    return (
    <>
    <Header />
    <Nav/>
    <main>{props.children}</main>
    {/* <Aside /> */}
    {/* <Footer/> */}
    </>
    );
    }
    export default Layout;