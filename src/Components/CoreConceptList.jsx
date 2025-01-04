// Use props to passing component's property
// props CoreConceptList (props) {
//     props.img
//     props.title
// }
// Use props by using object destructing
export default function CoreConceptList ({img, title, description}) {
  return <li>
    <img src={img} alt={title}/>
    <h3>{title}</h3>
    <p>{description}</p>
  </li>
}
