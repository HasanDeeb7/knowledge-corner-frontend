import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';
// import  {useUserContext}  from '../../Auth/UserContext';
import axios from 'axios';



export default function HiddenLegend() {
  const [isHidden, setIsHidden] = React.useState(false);
//   const { myUser, signin, signout } = useUserContext();
const [loading,setLoading]=React.useState(true)
const[authors,setAuthors]=React.useState(null)
const [series,setSeries]=React.useState(null)
const fix = [
  {
    data: [
      { id: 0, value: 10, label: 'fetching authors' ,color:'#B1E3FF'},
      { id: 1, value: 10, label: 'fetching authors',color:'#B1E3FF' },
      { id: 2, value: 10, label: 'fetching authors' ,color:'#B1E3FF'},
    ],
  },
];
/**
 * 
 *     '#95A4FC',
              '#1C1C1C',
            '#B1E3FF',
            '#BAEDBD',  
            '#A1E3CB',
 */
const colors=[
  '#BAEDBD',
  '#B1E3FF',
'#1C1C1C',

'#A1E3CB',
'#95A4FC',]
  const fetchTopAuhtors=async()=>{
    try {
    
const res=await  axios.get(`${process.env.REACT_APP_PATH}/api/books/top`)
if(res){
    setAuthors(res.data)
    console.log(res.data)
    setSeries([
      {
        data:res.data.map((author,index)=>({
          id:index,
          value:author.bookCount,
          label:author.authorName,
          color:colors[index]

        }))
      }
    ])
    setLoading(false)
}
      }
      catch (error) {
        console.log('error fetching'+error.message)
        setLoading(false)
  
      }
        
    } 
  
React.useEffect(()=>{
   fetchTopAuhtors()

},[])
  
  return (
    <Stack sx={{background:"white" ,borderRadius:"15px",  padding:'10px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    borderRadius: '8px',        width:"30rem"}}>
      <FormControlLabel sx={{color:"black" ,width:"10 rem", alignSelf:"start"}}
        checked={isHidden}
        control={
          <Checkbox sx={{color:'black'}} onChange={(event) => setIsHidden(event.target.checked)} />
        }
        label="hide labels"
        labelPlacement="end"
      />
       <div style={{ textAlign: 'center', marginBottom: '10px',color:'#03151e' }}>
        <h4>Top Authors Pie Chart</h4>
      </div>
      <PieChart sx={{}}
        series={!loading?series:fix}
        slotProps={{ legend: { hidden: isHidden } }}
        width={400}
        height={200}
        title="Top Authors"
   
      />
    </Stack>
  );
}