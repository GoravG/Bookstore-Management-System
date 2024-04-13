import React from 'react'
import Carousel from './Carousel'
import BookThumbCard from './BookThumbCard'
import { Link } from 'react-router-dom'
function LandingPageContent() {
    return (
        <>
            <div className="container-fluid mt-2">
                <div className="p-2 bg-body-tertiary rounded-3 border" >
                    <div className="container-fluid py-2">
                        <h1 className="display-2 fw-bold">Welcome to Sunbeam Books📚</h1>
                        <p className="col-md-8 fs-4">Dive into a world of diverse genres, from gripping thrillers to heartwarming romances, thought-provoking non-fiction to enchanting fantasy. Our carefully curated selection ensures there's something for every reader's taste and preference.</p>
                        <Link to="/faq" className="btn btn-secondary">Have Any Questions ?</Link>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-2">
                <div className="d-flex">
                    <div className="p-2 bg-danger-subtle rounded-3 border me-1">
                        <div className="container-fluid py-2">
                            <h1 className="display-6 fw-bold">Lose Yourself in a Good Book 🌟</h1>
                            <p className="col-md-8 fs-6">From spine-tingling mysteries to heartwarming romances, from epic fantasies to insightful memoirs, our collection has something for everyone. Lose yourself in captivating narratives and explore new worlds with every turn of the page.</p>
                        </div>
                    </div>
                    <div className="p-2 bg-success-subtle rounded-3 border ms-1 me-1">
                        <div className="container-fluid py-2">
                            <h1 className="display-6 fw-bold">Unleash Your Imagination 🌌</h1>
                            <p className="col-md-8 fs-6">Browse our collection, discover new authors, and embark on an adventure through the written word. With each book you read, you'll unlock new worlds, gain fresh perspectives, and enrich your life in countless ways.</p>
                        </div>
                    </div>
                    <div className="p-2 bg-warning-subtle rounded-3 border ms-1">
                        <div className="container-fluid py-2">
                            <h1 className="display-6 fw-bold">Start Your Literary Journey Today 🚀</h1>
                            <p className="col-md-8 fs-6">Discover captivating stories, insightful knowledge, and endless adventures within the pages of our books. Whether you're an avid reader, a curious learner, or simply seeking inspiration, you'll find a treasure trove of literature waiting for you here. Or we are here to help you.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-2">
                <div className="d-flex">
                    <div className="p-2 bg-info rounded-3 border me-1">
                        <div className="container-fluid py-2">
                            <h1 className="display-6 fw-bold">Explore Our Collection 🌟</h1>
                            <p className="col-md-8 fs-6">From spine-tingling mysteries to heartwarming romances, from epic fantasies to insightful memoirs, our collection has something for everyone. Lose yourself in captivating narratives and explore new worlds with every turn of the page.</p>
                        </div>
                    </div>
                    <div className="p-2 bg-body-secondary rounded-3 border ms-1">
                        <div className="container-fluid py-2">
                            <h1 className="display-6 fw-bold">Unleash Your Imagination 🌌</h1>
                            <p className="col-md-8 fs-6">Browse our collection, discover new authors, and embark on an adventure through the written word. With each book you read, you'll unlock new worlds, gain fresh perspectives, and enrich your life in countless ways.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Carousel />
            <div className="container-fluid mt-2">
                <div className="row g-2">
                    <div className="col">
                        <BookThumbCard ms={0} me={1} ttl={"Ikigai"}></BookThumbCard>
                    </div>
                    <div className="col">
                        <BookThumbCard ms={0} me={1} ttl={"Blender for Dummies"}></BookThumbCard>
                    </div>
                    <div className="col">
                        <BookThumbCard ms={0} me={1} ttl={"Clash of Kings"}></BookThumbCard>
                    </div>
                    <div className="col">
                        <BookThumbCard ms={0} me={0} ttl={"A Feast for Crows"}></BookThumbCard>
                    </div>
                    <div className="col">
                        <BookThumbCard ms={0} me={0} ttl={"A Dance with Dragons"}></BookThumbCard>
                    </div>
                    <div className="col">
                        <BookThumbCard ms={0} me={0} ttl={"A Storm of Swords"}></BookThumbCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageContent