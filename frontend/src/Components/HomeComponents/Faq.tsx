import { memo, useState } from "react";


const faqs = [
  {
    question: "What types of cars do you offer?",
    answer: "At Mobilia, we offer a wide range of vehicles including economy cars, SUVs, luxury sedans, and vans — perfect for any need or budget.",
  },
  {
    question: "How can I book a car?",
    answer: "You can book directly through our website by filling out the reservation form, or by contacting us via phone or email.",
  },
  {
    question: "Do I need a credit card to rent a car?",
    answer: "Yes, a valid credit or debit card is required for the security deposit and payment at the time of pickup.",
  },
  {
    question: "What documents are required to rent a car?",
    answer: "You need a valid driver’s license, a national ID or passport, and a credit/debit card under your name.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Yes, basic insurance is included in all rentals. Additional coverage options are available for extra protection.",
  },
];
const Faq = () => {


       const [openIndex, setOpenIndex] = useState<number | null>(null);

    return(

        <section className="flex flex-col items-center bg-gray-100 w-full" id="faq">
            <h1 className="text-black font-black text-[2.5em] mt-5">Faq</h1>

            <p className="w-[600px] max-[650px]:w-[300px] text-[1.1em] font-bold text-center mt-5 text-gray-700 max-[650px]:text-[1em]">Have questions about Mobilia? Here are some of the most common inquiries answered to help you make the best choice.</p>

                         <div className="flex flex-col mt-10 mb-15">
                  {faqs.map((faq, index) => (
            <div key={index} className=" bg-white w-[400px] shadow-2xl max-[450px]:w-[300px]">
              <button
                className="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span className="text-[2em] font-light cursor-pointer">{openIndex === index ? "−" : "+"}</span>
              </button>
               <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 px-4 pb-3" : "max-h-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
            </div>
          ))}
             </div>

        </section>
    )
}

export default memo(Faq);