import styles from './BaseTemplate.module.css';

export interface IBaseTemplateProps extends React.ComponentPropsWithoutRef<"div"> {
    sampleTextProp : String
}

const BaseTemplate: React.FC<IBaseTemplateProps> = ({ sampleTextProp}) => {
    return <div className={`container`}>{sampleTextProp}</div>
};

export default BaseTemplate;