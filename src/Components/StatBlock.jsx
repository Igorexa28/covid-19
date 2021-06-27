import '../Styles/StatBlock.css';

const StatBlock = ({array, callback}) => {

    const sortFromAToZ = () => {
        const copyObject = [...array];
        
        copyObject.sort((object1, object2) => object1.Country.localeCompare(object2.Country));
    
        callback(copyObject);
    }
    
    const sortFromZToA = () => {
        const copyObject = [...array];
        
        copyObject.sort((object1, object2) => object1.Country.localeCompare(object2.Country));
        copyObject.reverse();
        
        callback(copyObject);
    }
    
    const sortFromLowest = () => {
        const copyObject = [...array];
        
        copyObject.sort((object1, object2) => object1.TotalConfirmed - object2.TotalConfirmed);
    
        callback(copyObject);
    }
    
    const sortFromHighest = () => {
        const copyObject = [...array];
        
        copyObject.sort((object1, object2) => object2.TotalConfirmed - object1.TotalConfirmed);
    
        callback(copyObject);
    }

    return (
        <div className="nameStatBlock">
            <div>№</div>
            <div>Country 
                <button onClick={sortFromAToZ}>A-Z</button>
                <button onClick={sortFromZToA}>Z-A</button>
            </div>
            <div>Total Confirmed 
                <button onClick={sortFromLowest}>L to H ↑</button> 
                <button onClick={sortFromHighest}>H to L ↓</button>
            </div>
        </div>
    );
};

export default StatBlock;