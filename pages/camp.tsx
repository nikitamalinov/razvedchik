import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";

// import { PaymentsForm } from "react-square-web-payments-sdk";

export default function Camp() {
  return (
    <Layout>
      <div className="flex flex-col w-full justify-center font-helvetica font-normal items-center  text-black p-10">
        <div className="flex items-center gap-5">
          <div className=" flex flex-col pt-16 items-center py-4 ">
            <h1 className="mr-auto text-3xl mb-5 font-medium">Forms</h1>
            <div className="flex flex-col sev:flex-row gap-5 items-center">
              <a
                href="/camp-package-2024.pdf"
                target="_blank"
                className="bg-blue text-white rounded-lg transition-colors duration-200 text-xl
         py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover "
              >
                Camp Package
              </a>
              <a
                href="/membership/child"
                target="_blank"
                className="bg-blue text-white rounded-lg transition-colors duration-200 text-xl
         py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover "
              >
                Child Membership
              </a>
              <a
                href="/membership/adult"
                target="_blank"
                className="bg-blue text-white rounded-lg transition-colors duration-200 text-xl
         py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover "
              >
                Adult Membership
              </a>
            </div>
            <div className="flex flex-col items-center gap-10 mt-16 mx-5 text-center">
              <span className="text-xl">
                You can pay the dues for memberships, summer camp, and winter
                camp with Square or Zelle.
              </span>
              <span>
                <a
                  href="https://razvedchik.square.site/s/shop"
                  target="_blank"
                  className="bg-blue text-white rounded-lg transition-colors duration-200 text-xl
         py-1 px-3 whitespace-nowrap shadow-md hover:shadow-lg cursor-pointer hover:bg-blueHover "
                >
                  Square Site
                </a>
              </span>
              <span
                className="bg-blue text-white rounded-lg transition-colors duration-200 text-xl
         py-1 px-3 whitespace-nowrap shadow-md"
              >
                razvedchik.dnn@gmail.com
              </span>
            </div>
          </div>
          <Image
            src="/photos/10.jpg"
            width={400}
            height={579}
            alt="Camp"
            className="hidden jobs:block"
          />
        </div>
      </div>
    </Layout>
  );
}
