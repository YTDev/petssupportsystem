import React from "react";
import FAQItem from "./FAQItem";
import FAQCallToAction from "./FAQCallToAction";

const FaqSection = () => {
  return (
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
              answer="Although adoption in of itself is free, there are various costs associated with taking care of another living being, you should allways be mindful of aquiring an animal!."
            />

            <FAQItem
              question="How can I contact an animal shelter?"
              answer="You can use our messaging system to contact a shelter! When submiting your request, an email will be sent to the shelter to notify them of your interest, and create a bridge of contact, from then on the contact will be directly with the shelter itself by means of their choice."
            />
            <FAQItem
              question="What things should I be aware of before adoption a pet?"
              answer="Ensure you have enough time and commitment for pet care.
              Consider the pet's size, breed, and energy needs.
              Prepare your home with necessary supplies and safety measures.
              Think about the financial costs involved in pet ownership.
              Research the pet’s health and dietary requirements.
              Evaluate how a pet will fit into your lifestyle and daily routine.
              Be prepared for the long-term responsibility of caring for a pet."
            />
          </div>
        </div>

        <FAQCallToAction />
      </div>
    </section>
  );
};

export default FaqSection;
