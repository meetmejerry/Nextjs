import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A first meetup",
//     image:
//       "https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg",
//     address: "123 City, London, England",
//     description: "This is the first meetup",
//   },
//   {
//     id: "m2",
//     title: "A first meetup",
//     image:
//       "https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg",
//     address: "123 City, London, England",
//     description: "This is the second meetup",
//   },
//   {
//     id: "m3",
//     title: "A first meetup",
//     image:
//       "https://cdn.britannica.com/82/183382-050-D832EC3A/Detail-head-crown-Statue-of-Liberty-New.jpg",
//     address: "123 City, London, England",
//     description: "This is the third meetup",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browae a huge list of higly active React elements"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  const client = await MongoClient.connect(
    "mongodb+srv://reactProject:1UGcFnoKzaKsjtSl@cluster0.sc2jwga.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollection = db.collection("meetups");

  const data = await meetUpCollection.find().toArray();
  console.log(data);

  client.close();
  return {
    props: {
      meetups: data.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

//we dont have to worry about these credentials being appearing in the console log as the below function will be executed only in the
//server side
// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://reactProject:1UGcFnoKzaKsjtSl@cluster0.sc2jwga.mongodb.net/?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   const meetUpCollection = db.collection("meetups");

//   const data = await meetUpCollection.find().toArray();
//   console.log(data);

//   client.close();
//   return {
//     props: {
//       meetups: data.map((meetup) => ({
//         title: meetup.title,
//         address: meetup.address,
//         image: meetup.image,
//         id: meetup._id.toString(),
//       })),
//     },
//     revalidate: 1,
//   };
// }

export default HomePage;
