import React from "react";
import FAQItem from "./FAQItem";
import FAQCallToAction from "./FAQCallToAction";
import { Element } from 'react-scroll';

const FaqSection = () => {
  return (
<Element name="questions">
    <section className=" py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-semibold text-black tracking-wider">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl mt-4 text-gray-600 md:mt-5 ">
            We have the answers to your questions
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          <div className="flex flex-col gap-8 -space-y-px divide-y divide-gray-200">
            <FAQItem
              question="Is adoption free of charge?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et egestas purus. Donec nec nunc eget nunc ultricies fermentum. Nullam nec nunc eget nunc ultricies fermentum."
            />

            <FAQItem
              question="How can I contact an animal shelter?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et egestas purus. Donec nec nunc eget nunc ultricies fermentum. Nullam nec nunc eget nunc ultricies fermentum."
            />
            <FAQItem
              question="Is blabla a type of blablablu ?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et egestas purus. Donec nec nunc eget nunc ultricies fermentum. Nullam nec nunc eget nunc ultricies fermentum."
            />
          </div>
        </div>

        <FAQCallToAction />
      </div>
    </section>
    </Element>
  );
};

export default FaqSection;
