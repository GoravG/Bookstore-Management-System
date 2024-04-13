import React from 'react'
import Navbar from '../components/Navbar'

function FAQPage() {
    return (
        <>
            <Navbar />
            <h2 className='fw-bold text-center mt-2'>Frequently Asked Questions</h2>
            <div className="container">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#one" aria-expanded="true" aria-controls="one">
                                How do I place an order?
                            </button>
                        </h2>
                        <div id="one" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                To place an order, simply browse our collection, add the books you want to your cart, and proceed to checkout. Follow the prompts to enter your shipping and payment information, and confirm your order.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#two" aria-expanded="true" aria-controls="two">
                                What payment methods do you accept?
                            </button>
                        </h2>
                        <div id="two" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also accept payments through UPI for added convenience.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#three" aria-expanded="false" aria-controls="three">
                                Do you offer international shipping?
                            </button>
                        </h2>
                        <div id="three" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                Yes, we offer international shipping to most countries. Shipping rates and delivery times may vary depending on the destination. You can check the shipping options and rates during the checkout process.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#four" aria-expanded="false" aria-controls="four">
                                What is your return policy?
                            </button>
                        </h2>
                        <div id="four" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                We want you to be completely satisfied with your purchase. If you are not happy with your order for any reason, you may return it within 30 days of receipt for a full refund or exchange. Please see our Returns & Exchanges page for more information on how to initiate a return.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#five" aria-expanded="false" aria-controls="five">
                                Do you offer gift wrapping services?
                            </button>
                        </h2>
                        <div id="five" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                Yes, we offer gift wrapping services for a small additional fee. During the checkout process, you will have the option to add gift wrapping to your order and include a personalized message for the recipient.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#six" aria-expanded="false" aria-controls="six">
                                Are there any discounts available for bulk orders?
                            </button>
                        </h2>
                        <div id="six" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                Yes, we offer discounts for bulk orders on certain titles. Please contact our sales team for more information and to request a quote for your specific needs.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQPage