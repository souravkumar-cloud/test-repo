const express=require('express');
const app=express();

const users=[{
    name:'John',
    age:30,
    kidney:[{
        healthy:false,
    }]
}];

app.get('/',(req,res)=>{
   const johnKidney=users[0].kidney;
   const numOfKidneys=johnKidney.length;
   let healthyKidneys=0;
   for(let i=0;i<numOfKidneys;i++){
        if(johnKidney[i].healthy){
            healthyKidneys++;
        }
   }
   const UnhealthyKidneys=numOfKidneys-healthyKidneys;
   res.json({
        numOfKidneys,
        healthyKidneys,
        UnhealthyKidneys
   })
});

app.use(express.json());
app.post('/',(req,res)=>{
    const isHealthy=req.body.isHealthy;
    users[0].kidney.push({healthy:isHealthy});
    res.json({
        message: 'Kidney status updated',
    });
});

app.put('/',(req,res)=>{
    for(let i=0;i<users[0].kidney.length;i++){
        users[0].kidney[i].healthy=true;
    }
    res.json({
        message: 'All kidneys set to healthy',
    });
})


app.delete('/',(req,res)=>{
    const newKidneys=[];
    for(let i=0;i<users[0].kidney.length;i++){
        if(users[0].kidney[i].healthy){
            newKidneys.push({
                healthy:true
            });
        }
    }
    users[0].kidney=newKidneys;
    res.json({
        message: 'Unhealthy kidneys deleted',
    });
})
app.listen(3000);