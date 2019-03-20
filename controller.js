const csv = require("csvtojson");

function getHome(req, res) {
    res.render('./index');
}

//sort the passed array according to the key passed in ascending or descending order
function _sortByKey(array_obj,key,sort_order){
    array_obj.sort(function(a,b){
        let comparison = 0;
        let valA = a[key]
        let valB = b[key]
        comparison = valA-valB;
        if(sort_order =='DSC'){
            return comparison * -1;
        }
        return comparison;
    })

}

//open the csv file and render a table using the data
async function getFileData(req,res){
    csvFilePath = './test_csv.csv';
    const jsonArray=await csv().fromFile(csvFilePath);   
    let sort_order_arr ={}
    Object.keys(jsonArray[0]).forEach((key)=>{
        sort_order_arr[key] = 'ASC'
    })
    if(req.query.sort_by){
        if(req.query.sort_order){
            _sortByKey(jsonArray,req.query.sort_by,req.query.sort_order[req.query.sort_by]);
            sort_order_arr[req.query.sort_by] = req.query.sort_order[req.query.sort_by]
        }
        else{
            _sortByKey(jsonArray,req.query.sort_by)
        }
        
    }

    res.render('./file_view.ejs', {data:jsonArray,keys:Object.keys(jsonArray[0]),sort_order_arr:sort_order_arr})
}

module.exports = {getHome,getFileData}