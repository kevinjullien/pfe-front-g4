import Meta from "../../components/Meta/Meta";
import Image from "next/image";
import Link from "next/link";

const postDetails = ({ post, user }) => {
  return (
    <>
      <Meta title={post.title} />
      <h1>{post.title}</h1>
      <p>{post.postNature}</p>
      <p>{post.price}€</p>
      <strong>
        <p>Infos du vendeur : </p>
      </strong>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>{user.email}</p>
      <Image src={post.image} height={100} width={100} alt="Image du produit" />
      <strong>
        <p>Description</p>
      </strong>
      <p>{post.description}</p>
      <p>Campus : {user.campus}</p>
      <Link href="/">Retour à la liste des annonces</Link>
    </>
  );
};

export const getStaticProps = async (context) => {
  //URL_FRONt = process.env.URL_FRONT;
  //server a initialiser
  console.log(process.env.URL_FRONT + `/api/posts/${context.params.id}`);
  const resPosts = await fetch(
    process.env.URL_FRONT + `/api/posts/${context.params.id}`
  ); //à changer
  const post = await resPosts.json();
  const sellerId = post.sellerId;
  const resUsers = await fetch(
    process.env.URL_FRONT + `/api/users/${sellerId}`
  ); //à changer
  const user = await resUsers.json();
  return {
    props: {
      post,
      user,
    },
  };
};

export const getStaticPaths = async () => {
  //server a initialiser
  const res = await fetch(process.env.URL_FRONT + `/api/posts/posts`); //à changer
  const posts = await res.json();

  const listIds = posts.map((post) => post.id);
  const paths = listIds.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false, //all paths not returned by getStaticPaths will result in a 404
  };
};

export default postDetails;
