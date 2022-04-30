export default function Summary({summary}){
    const {further_study,lesson_name,module_image,module_no,summary:body,title} =summary;


    return (
        <div className="summary">
            <img src={module_image} alt={lesson_name}/>
            <h3>{lesson_name}-module: {module_no}</h3>
            <h2>{title}</h2>
            <p>{body}</p>
            {further_study ? 
                <div>
                    <h2>Further study</h2>
                    <iframe src={further_study} title='further_study'></iframe>
                </div>
                :

                <></>       
                
            }

        </div>
    )
}