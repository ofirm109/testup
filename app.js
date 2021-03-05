const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose =require('mongoose');

//קורא לקומפוננטות-----------------------------

//קומפוננטה להגבלה למחובריפם בלבד



// קריאה לפונקציה שמודיע לכול קריאה
app.use(morgan("dev"));
//קריאה לתמונה מתוך הקישור

//חיבור לממסד נתונים--------------------------------



//מאפשרת קבלת מידע
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//כאן מוגדר הדו שיח בין השרת למשתמש

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin,X-Require-With,Content-Type, Accept, Authorization");

    if (req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, POST, PATHCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();

});

//פונקציות --------------------------------------------------
//ניסיון התחברות לשרת
app.get('/',(req,res)=>{
    res.status(200).json({
        message:'יש חיבור לשרת'
    
    });
});
//קורא לקומפוננטה


//שלא מוצאים פונקציה

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports=app;