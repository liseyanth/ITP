import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ViewQuestions() {
    const [faqItems, setFaqItems] = useState([
        {
            id: 1,
            question: 'What are organic cosmetics?',
            answer: 'Organic cosmetics are beauty products made from natural ingredients that are grown without synthetic pesticides or genetically modified organisms. They are formulated without harmful chemicals and are environmentally friendly.',
            isOpen: true,
        },
        {
            id: 2,
            question: 'Are organic cosmetics safer for the skin?',
            answer: 'Yes, organic cosmetics are generally considered safer for the skin because they contain fewer harsh chemicals and are less likely to cause skin irritations or allergies. They are often gentler and suitable for sensitive skin.',
            isOpen: false,
        },
        {
            id: 3,
            question: 'What certifications should I look for in organic cosmetics?',
            answer: 'Look for certifications such as "USDA Organic" or "ECOCERT" on organic cosmetics. These certifications ensure that the products meet specific organic and natural standards.',
            isOpen: false,
        },
        {
            id: 4,
            question: 'Can organic cosmetics provide anti-aging benefits?',
            answer: 'Yes, many organic cosmetics contain natural ingredients like antioxidants, vitamins, and botanical extracts that can help fight the signs of aging and improve skin health.',
            isOpen: false,
        },
        {
            id: 5,
            question: 'Are organic cosmetics cruelty-free?',
            answer: 'Many organic cosmetics brands are cruelty-free, which means they do not test their products on animals. Look for cruelty-free certifications or statements on the product packaging.',
            isOpen: false,
        },
        {
            id: 6,
            question: 'What are some common organic cosmetic ingredients?',
            answer: 'Common organic cosmetic ingredients include aloe vera, shea butter, coconut oil, jojoba oil, lavender oil, chamomile extract, and green tea extract, among others.',
            isOpen: false,
        },
        {
            id: 7,
            question: 'Do organic cosmetics have a shorter shelf life?',
            answer: "Organic cosmetics may have a shorter shelf life compared to conventional products because they often lack synthetic preservatives. It's important to check product expiration dates and store them properly.",
            isOpen: false,
        },
        {
            id: 8,
            question: 'Can organic cosmetics be suitable for all skin types?',
            answer: 'Yes, organic cosmetics are available for all skin types, including oily, dry, sensitive, and combination skin. There are various organic products formulated to address specific skin concerns.',
            isOpen: false,
        },
        {
            id: 9,
            question: 'Are there organic cosmetics for men?',
            answer: 'Yes, there are organic cosmetics designed specifically for men, including organic shaving creams, moisturizers, and grooming products. These products are formulated to meet the unique needs of men\'s skin.',
            isOpen: false,
        },
        {
            id: 10,
            question: 'Can organic cosmetics be eco-friendly?',
            answer: 'Yes, organic cosmetics are often eco-friendly as they use sustainable farming practices and biodegradable packaging. Choosing organic cosmetics can reduce your environmental impact.',
            isOpen: false,
        },
        // Add more FAQ items as needed
    ]);


    const toggleFaqItem = (itemId) => {
        setFaqItems((prevItems) =>
            prevItems.map((item) => ({
                ...item,
                isOpen: item.id === itemId ? !item.isOpen : item.isOpen,
            }))
        );
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 px-5"> {/* Full width content */}
                    <section id="faq" className="faq section-bg" >
                        <div className='d-flex justify-content-end'>
                            <Link to="/addticket"><button className='btn btn-seondary mt-2' style={{backgroundColor:"gray",color:"black"}}>Raise a Ticket</button></Link>
                        </div>
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                                <h2 className="" style={{color:"black"}}> Frequently Asked Questions</h2>
                                <p>
                                    Welcome to Ester Aura Organic Cosmetics - Where Beauty Meets Nature! At Ester Aura,
                                    we believe that true beauty begins with nature. We are passionate about harnessing
                                    the power of Mother Earth's purest ingredients to create a range of organic cosmetics
                                    that not only enhance your natural beauty but also nurture your skin and the planet.
                                </p>
                            </div>
                            <div className="faq-list">
                                <ul>
                                    {faqItems.map((faqItem) => (
                                        <li className="list-group-item mt-1 bg-white" style={{ borderRadius: 20 }} key={faqItem.id} data-aos="fade-up" data-aos-delay="100">
                                            <i className="bx bx-help-circle icon-help"></i>{' '}
                                            <a
                                                onClick={() => toggleFaqItem(faqItem.id)}
                                                className={faqItem.isOpen ? 'collapsed' : ''}
                                            >
                                                {faqItem.question}{' '}
                                                <i
                                                    className={`bx ${faqItem.isOpen ? 'bx-chevron-up' : 'bx-chevron-down'
                                                        } icon-show`}
                                                ></i>
                                            </a>
                                            {faqItem.isOpen && (
                                                <div className="faq-answer">
                                                    <p className='black'>{faqItem.answer}</p>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}