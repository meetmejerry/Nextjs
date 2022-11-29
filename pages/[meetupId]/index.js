import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>{props.meetUpDetail.title}</Head>
      <meta name="description" content={props.meetUpDetail.description}></meta>
      <MeetupDetail
        img={props.meetUpDetail.image}
        title={props.meetUpDetail.title}
        address={props.meetUpDetail.address}
        description={props.meetUpDetail.description}
        id={props.meetUpDetail.id}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://reactProject:1UGcFnoKzaKsjtSl@cluster0.sc2jwga.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetUpsCollection = db.collection("meetups");

  const meetups = await meetUpsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetUpId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://reactProject:1UGcFnoKzaKsjtSl@cluster0.sc2jwga.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetUpsCollection = db.collection("meetups");

  const selectedMeetup = await meetUpsCollection.findOne({
    _id: ObjectId(meetUpId),
  });
  return {
    props: {
      meetUpDetail: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
