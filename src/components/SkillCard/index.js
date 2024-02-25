import './index.css'

const SkillCard = props => {
  const {skillsDetails} = props
  const {imageUrl, name} = skillsDetails

  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <h1 className="heading">{name}</h1>
    </li>
  )
}

export default SkillCard
