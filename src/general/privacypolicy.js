import React, { Fragment, useEffect, useState} from 'react';
import Layout from '../core/layout';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import axios from 'axios';
import loadingSpinner from '../components/loadingspinner'
import ProductCards from '../components/productcards'
// import SidbarCard from '../components/sidebarcard'
// import Sidebar from "react-sidebar";
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';



const PrivacyPolicy = ()=>(
    <div className='container p-lg-5'>
        <div>
       <h1 className='text-center'>Privacy Policy</h1>
    <h4 className='text-center'>Kwaysi Privacy Policy</h4>

    <p>
      This page is used to inform website visitors regarding our policies with
      the collection, use, and disclosure of Personal Information if anyone
      decided to use our Service.
    </p>

    <p>
      If you choose to use our Service, then you agree to the collection and use
      of information in relation to this policy. The Personal Information that
      we collect is used for providing and improving the Service. We will not
      use or share your information with anyone except as described in this
      Privacy Policy.
    </p>

    <h4>Information Collection and Use</h4>
    <p>
      For a better experience, while using our Service, we may require you to
      provide us with certain personally identifiable information, including but
      not limited to Device ID. The information that we request is will be
      retained by us and used as described in this privacy policy.
    </p>

    <h4>Cookies</h4>

    <p>
      Cookies are files with small amount of data that is commonly used an
      anonymous unique identifier. These are sent to your browser from the
      website that you visit and are stored on your device internal memory.
    </p>

    <p>
      This Service does not use these “cookies” explicitly. However, the app may
      use third party code and libraries that use “cookies” to collection
      information and to improve their services. You have the option to either
      accept or refuse these cookies and know when a cookie is being sent to
      your device. If you choose to refuse our cookies, you may not be able to
      use some portions of this Service.
    </p>

    <h4>Service Providers</h4>

    <p>
      We may employ third-party companies and individuals due to the following
      reasons:
    </p>

    <p>To facilitate our Service;</p>
    <p>To provide the Service on our behalf;</p>
    <p>To perform Service-related services; or</p>
    <p>To assist us in analyzing how our Service is used.</p>
    <p>
      We want to inform users of this Service that these third parties have
      access to your Personal Information. The reason is to perform the tasks
      assigned to them on our behalf. However, they are obligated not to
      disclose or use the information for any other purpose.
    </p>

    <h4>Security</h4>

    <p>
      We value your trust in providing us your Personal Information, thus we are
      striving to use commercially acceptable means of protecting it. But
      remember that no method of transmission over the internet, or method of
      electronic storage is 100% secure and reliable, and we cannot guarantee
      its absolute security.
    </p>

    <h4>Links to Other Sites</h4>
    <p>
      This Service may contain links to other sites. If you click on a
      third-party link, you will be directed to that site. Note that these
      external sites are not operated by us. Therefore, we strongly advise you
      to review the Privacy Policy of these websites. We have no control over
      and assume no responsibility for the content, privacy policies, or
      practices of any third-party sites or services.
    </p>

    <h4>Children’s Privacy</h4>
    <p>
      These Services do not address anyone under the age of 13. We do not
      knowingly collect personally identifiable information from children under
      13. In the case we discover that a child under 13 has provided us with
      personal information, we immediately delete this from our servers. If you
      are a parent or guardian and you are aware that your child has provided us
      with personal information, please contact us so that we will be able to do
      necessary actions.
    </p>

    <h4>Changes to This Privacy Policy</h4>
    <p>
      We may update our Privacy Policy from time to time. Thus, you are advised
      to review this page periodically for any changes. We will notify you of
      any changes by posting the new Privacy Policy on this page. These changes
      are effective immediately after they are posted on this page.
    </p>

    <h4>Contact Us</h4>

    <p>
      If you have any questions or suggestions about our Privacy Policy, do not
      hesitate to contact us on <strong>info@kwaysi.com</strong>
    </p>
    </div>
    </div>
);


export default PrivacyPolicy;
