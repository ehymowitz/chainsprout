import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  return { title: "test" };
}

const User = ({ params }: { params: { slug: string } }) => {
  return <p>slug: {params.slug}</p>;
};

export default User;
