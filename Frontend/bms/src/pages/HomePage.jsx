import React from 'react'
import Navbar from '../components/Navbar'
import LandingPageContent from '../components/LandingPageContent'
import FooterLarge from '../components/FooterLarge'
import axios from 'axios'

function HomePage() {
    return (
        <>
            <Navbar></Navbar>
            <LandingPageContent></LandingPageContent>
            <FooterLarge></FooterLarge>
        </>
    )
}

export default HomePage