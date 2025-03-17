import React from "react";
import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";
import { Counter } from "motioncounter";
import { Link } from "react-router-dom";
function HomeContent() {
    const flickityOptions = {
        wrapAround: true,
        autoPlay: 3000,
        contain: true,
        pageDots: true,
        prevNextButtons: true,
        adaptiveHeight: true
    };
    return (
        <>
            <div className="w-full flex justify-between flex-col mx-auto px-4 py-12 text-center relative" style={{
                backgroundImage: "url('https://www.shutterstock.com/image-vector/dog-bone-vector-paw-doodle-600nw-2515762941.jpg')",
                backgroundRepeat: 'repeat',
                backgroundSize: 'contain',
                position: 'relative'
            }}>
                <div className="absolute inset-0 bg-white opacity-90 z-0"></div>
                <svg className="absolute top-0 left-0 w-full h-20 z-10" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path
                        fill="#207CC8"
                        d="M0,100L48,94.7C96,89,192,79,288,62.7C384,47,480,25,576,20C672,15,768,25,864,41.3C960,57,1056,79,1152,84C1248,89,1344,79,1392,73.3L1440,68L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
                <div className="relative z-10 max-w-7xl mx-auto my-10 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                        <div className="border-2 border-[#103D62] rounded-lg p-6 shadow-md">
                            <Counter
                                from={0}
                                to={35}
                                inViewOptions={{ once: true }}
                                className="text-4xl font-bold mb-2"
                                formatter={(value) =>
                                    Intl.NumberFormat("en-US").format(value.toFixed(0))
                                }
                            />
                            <h1 className="text-4xl font-bold">Rescued</h1>
                            <h3 className="text-xl p-2">August 2024</h3>
                        </div>

                        <div className="border-2 border-[#103D62] rounded-lg p-6 shadow-md">
                            <Counter
                                from={0}
                                to={130}
                                inViewOptions={{ once: true }}
                                className="text-4xl font-bold mb-2"
                                formatter={(value) =>
                                    Intl.NumberFormat("en-US").format(value.toFixed(0))
                                }
                            />
                            <h1 className="text-4xl font-bold">Adopted</h1>
                            <h3 className="text-xl p-2">August 2024</h3>
                        </div>

                        <div className="border-2 border-[#103D62] rounded-lg p-6 shadow-md">
                            <Counter
                                from={0}
                                to={400}
                                inViewOptions={{ once: true }}
                                className="text-4xl font-bold mb-2"
                                formatter={(value) =>
                                    Intl.NumberFormat("en-US").format(value.toFixed(0))
                                }
                            />
                            <h1 className="text-4xl font-bold">Adopted in</h1>
                            <h3 className="text-xl p-2">2024</h3>

                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 py-8"> Furry friends looking for a new home</h1>
                    <p className="text-xl mb-6 ">Give an animal in need the second chance it deserves</p>

                    <div className="flex justify-center py-3">
                        <Link to="/pets" className="bg-blue-500 text-white font-bold py-3 px-8 rounded-3xl hover:bg-opacity-70 hover:scale-105 transition-all">
                            Adopt now
                        </Link>
                    </div>
                </div>
                {/* Testimonials */}
                <div className="w-full rounded-3xl py-16">
                    <h2 className="relative text-3xl font-bold font-style mb-8 text-center text-black">Success Stories</h2>
                    <Flickity
                        className={'carousel w-full'}
                        elementType={'div'}
                        options={{
                            wrapAround: true,
                            autoPlay: 3000,
                            contain: true,
                            pageDots: true,
                            prevNextButtons: true,
                            adaptiveHeight: true,
                            cellAlign: 'center',
                            draggable: true,
                            groupCells: false,
                            selectedAttraction: 0.2,
                            friction: 0.8
                        }}
                    >
                        <div className="carousel-cell w-full px-20 mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-lg h-full grid grid-cols-2 gap-6 items-center">
                                <div className="text-left">
                                    <h3 className="text-2xl font-semibold mb-4">Max's Journey</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">Found as a scared puppy under a bridge, Max was brought to our shelter malnourished and afraid. With patience and care, he transformed into a confident, loving dog. After two months, he found his perfect match with the Thompson family, where he now enjoys long walks and endless belly rubs.</p>
                                </div>
                                <div>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw" alt="Max's Story" className="w-full h-80 object-cover rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-cell w-full px-20 mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-lg h-full grid grid-cols-2 gap-6 items-center">
                                <div className="text-left">
                                    <h3 className="text-2xl font-semibold mb-4">Luna's Second Chance</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">Luna was rescued from an abandoned property, where she had been left behind. Despite her rough start, her gentle spirit never wavered. After rehabilitation and lots of love, she found her forever home with a retired couple who give her the peaceful, loving life she deserves.</p>
                                </div>
                                <div>
                                    <img src="https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg" alt="Luna's Story" className="w-full h-80 object-cover rounded-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="carousel-cell w-full px-20 mx-auto">
                            <div className="bg-white p-6 rounded-lg shadow-lg h-full grid grid-cols-2 gap-6 items-center">
                                <div className="text-left">
                                    <h3 className="text-2xl font-semibold mb-4">Bella's Miracle</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">Bella came to us with severe anxiety after being rescued from a hoarding situation. Through dedicated behavioral training and endless patience, she blossomed into a social butterfly. Within just a week of being ready for adoption, she found her perfect match with a family experienced in helping traumatized pets heal.</p>
                                </div>
                                <div>
                                    <img src="https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg" alt="Bella's Story" className="w-full h-80 object-cover rounded-lg" />
                                </div>
                            </div>
                        </div>
                    </Flickity>
                </div>
            </div>
        </>
    );
}

export default HomeContent;