import React from 'react'
import Carousel from './Carousel'
import BookThumbCard from './BookThumbCard'
function LandingPageContent() {
    return (
        <>
            <div className="container-fluid mt-2">
                <div class="p-2 bg-body-tertiary rounded-3 border" >
                    <div class="container-fluid py-2">
                        <h1 class="display-2 fw-bold">Welcome to Sunbeam Books📚</h1>
                        <p class="col-md-8 fs-4">Dive into a world of diverse genres, from gripping thrillers to heartwarming romances, thought-provoking non-fiction to enchanting fantasy. Our carefully curated selection ensures there's something for every reader's taste and preference.</p>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-2">
                <div className="d-flex">
                    <div class="p-2 bg-danger-subtle rounded-3 border me-1">
                        <div class="container-fluid py-2">
                            <h1 class="display-6 fw-bold">Lose Yourself in a Good Book 🌟</h1>
                            <p class="col-md-8 fs-6">From spine-tingling mysteries to heartwarming romances, from epic fantasies to insightful memoirs, our collection has something for everyone. Lose yourself in captivating narratives and explore new worlds with every turn of the page.</p>
                        </div>
                    </div>
                    <div class="p-2 bg-success-subtle rounded-3 border ms-1 me-1">
                        <div class="container-fluid py-2">
                            <h1 class="display-6 fw-bold">Unleash Your Imagination 🌌</h1>
                            <p class="col-md-8 fs-6">Browse our collection, discover new authors, and embark on an adventure through the written word. With each book you read, you'll unlock new worlds, gain fresh perspectives, and enrich your life in countless ways.</p>
                        </div>
                    </div>
                    <div class="p-2 bg-warning-subtle rounded-3 border ms-1">
                        <div class="container-fluid py-2">
                            <h1 class="display-6 fw-bold">Start Your Literary Journey Today 🚀</h1>
                            <p class="col-md-8 fs-6">Discover captivating stories, insightful knowledge, and endless adventures within the pages of our books. Whether you're an avid reader, a curious learner, or simply seeking inspiration, you'll find a treasure trove of literature waiting for you here. Or we are here to help you.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-2">
                <div className="d-flex">
                    <div class="p-2 bg-info rounded-3 border me-1">
                        <div class="container-fluid py-2">
                            <h1 class="display-6 fw-bold">Explore Our Collection 🌟</h1>
                            <p class="col-md-8 fs-6">From spine-tingling mysteries to heartwarming romances, from epic fantasies to insightful memoirs, our collection has something for everyone. Lose yourself in captivating narratives and explore new worlds with every turn of the page.</p>
                        </div>
                    </div>
                    <div class="p-2 bg-body-secondary rounded-3 border ms-1">
                        <div class="container-fluid py-2">
                            <h1 class="display-6 fw-bold">Unleash Your Imagination 🌌</h1>
                            <p class="col-md-8 fs-6">Browse our collection, discover new authors, and embark on an adventure through the written word. With each book you read, you'll unlock new worlds, gain fresh perspectives, and enrich your life in countless ways.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Carousel />
            <div className="container-fluid mt-2">
                <div class="row">
                    <div class="col">
                        <BookThumbCard ms={0} me={1} isbn={9780002247399}></BookThumbCard>
                    </div>
                    <div class="col">
                        <BookThumbCard ms={0} me={1} isbn={9780441172719}></BookThumbCard>
                    </div>
                    <div class="col">
                        <BookThumbCard ms={0} me={1} isbn={9781471146701}></BookThumbCard>
                    </div>
                    <div class="col">
                        <BookThumbCard ms={0} me={0} isbn={9780007459476}></BookThumbCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPageContent