import { useTranslation } from 'react-i18next';

function SkillsDisplay({ skills, labelKey }) {
  const { t } = useTranslation();

  return (
    <div className="skills-section">
      <h4>{t(labelKey)}</h4>
      <div className="skill-group">
        <div className="tech-stack">
          {skills.flatMap(({ class: cls, skills: list }) =>
            list.map((skill) => (
              <span key={`${cls}-${skill}`} className={`tech-tag ${cls}`}>
                {skill}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillsDisplay;
