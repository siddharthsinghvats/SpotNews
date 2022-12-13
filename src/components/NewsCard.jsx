import Card from "react-bootstrap/Card";

function reverseString(str) {
  var s = str.split("");

  var date =
    s[8] + s[9] + s[7] + s[5] + s[6] + s[4] + s[0] + s[1] + s[2] + s[3];

  return date;
}

function NewsCard(props) {
  console.log(props.props);
  props = props.props;
  var desc = props.description;
  var pub_at = props.publishedAt.substring(0, 10);
  pub_at = reverseString(pub_at);
  desc = desc.substring(0, Math.min(150, desc.length));
  var titl = props.title;
  titl = titl.substring(0, Math.min(200, titl.length));
  var src = props.source.name;
  src = src.substring(0, Math.min(20, src.length));

  const img =
    props.image ||
    "https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <Card>
      <Card.Img variant="top" src={img} className="h-64" />

      <Card.Body>
        <Card.Title>{titl + "."}</Card.Title>
        <div className="flex justify-between my-2">
          <span className="font-bold">{src}</span>
          <span>{pub_at}</span>
        </div>
        <div
          id="c-text"
          className="card-text"
          dangerouslySetInnerHTML={{ __html: desc + "..." }}
        ></div>
        <a
          href={props.url}
          target="_blank"
          rel="noreferrer"
          className="text-white no-underline bg-purple-500 cursor-pointer my-2 border-2 border-purple-900 p-2 rounded-md hover:bg-purple-700"
        >
          Know More!
        </a>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
