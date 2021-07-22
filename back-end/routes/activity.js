const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Activity = require('../models/activity');



router.get('/', (req, res) => {
    Activity.find((err, activities) => {
        if(err){
            res.status(404).json({success: false, msg: "Cannot find any activities..."});
        }else{
            res.json({success: true, activities: activities});
        }
    });
});

router.post('/', (req, res) => {
    const newActivity = {
        name: req.body.name,
        images: req.body.images,
        point: req.body.point,
        hours: req.body.hours,
        desc: req.body.desc,
        students: req.body.students
    };
    let act_id = {};

    Activity.create(newActivity, (err, activity) => {
        if(err){
            res.json({success: false, msg: "Cannot create activity"});
        }else{
            act_id = {_id: activity._id};
            res.json({success: true, activity: activity});

            newActivity.students.forEach(ele=>{
                User.findOne(ele, (err, user)=> {
                    if(err) throw err;

                    // if(user.activities){
                    //     user.activities.push(act_id);
                    // } else {
                    //     let arr = [];
                    //     arr.push(act_id);
                    //     user.activites = [...arr];
                    // }

                    user.activities.push(act_id);

                    user.save();
                });
            });
        }
    });

    
});

router.post('/:id/bookmark', (req, res) => {

    Activity.findById(req.params.id, (err, activity) => {
        if(err){
            res.json({success: false, msg: "Cannot bookmark activity"});
        } else {
            activity.bookmarked = !activity.bookmarked;

            activity.save((err, activity) => {
                if(err){
                    res.json({success: false, msg: "Cannot bookmark activity"});
                } else {
                    res.json({success: true, activity: activity});            
                }
            });
        }
    });
    
});

router.get('/:id', (req, res) => {
    Activity.findOne({_id: req.params.id}, (err, activity) => {
        if(err){
            res.json({success: false, msg: "Cannot find activity"});
        }else{
            res.json({success: true, activity: activity});
        }
    });
});

router.put('/:id', (req, res) => {

    const newActivity = {
        name: req.body.name,
        images: req.body.images,
        point: req.body.point,
        hours: req.body.hours,
        desc: req.body.desc,
        students: req.body.students,
        completed:req.body.completed
    };
    console.log(req.body);
    
    newActivity.students = newActivity.students.map(s => s._id);
    newActivity.completed = newActivity.completed.map(s => s._id);

    const oldStudents = req.body.old_students;
    const oldCompleted = req.body.old_completed;
    
    Activity.findByIdAndUpdate(req.params.id, newActivity, {useFindAndModify:false}, (err, activity) => {
        if(err){
            res.json({success: false, msg: "Cannot Update activity"});            
        } else {

            res.json({success: true, id: activity._id});
            // console.log(activity.students);

            // activity.students = newActivity.students;
            // activity.completed = newActivity.completed;

            // console.log("completed - ",activity.completed);

            for(let i = 0;i<oldStudents.length; i++){
                if(!(new Set(newActivity.students)).has(oldStudents[i])){
                    User.findById(oldStudents[i], (err, user) => {
                        if(err) throw err;
                        // user.activities = Array.from(new Set(user.activities));

                        let idx = user.activities.indexOf(activity._id);
                        if(idx !== -1)
                        user.activities.pull(user.activities[idx]._id);
                        
                        // console.log("remove",user.activities[i]);
                        user.save();
                    });
                } 

                // console.log((new Set(activity.students)).has(oldStudents[i]), oldStudents[i]);
                
            }

            oldCompleted.forEach((ele) => {
                if(!(new Set(newActivity.completed)).has(ele)){
                    User.findById(ele, (err, user) => {
                        if(err) throw err;
                        // user.completed = Array.from(new Set(user.completed));

                        let idx = user.completed.indexOf(activity._id);
                        if(idx !== -1)
                        user.completed.pull(user.completed[idx]._id);
                        // use pull() meth instead of splice() pull is mongoose's inbuilt meth 
                        user.save();
                    });
                }
            });



            newActivity.students.forEach((ele) => {
                User.findOne({_id:ele}, (err, user) => {
                    if(err) throw err;
                    let flag = (new Set(user.activities)).has(activity._id);
                    console.log(" ACT Push flag - ",flag);
                    if(!flag){
                        let act_id = {_id: activity._id}; 
                        let idx = user.activities.indexOf(activity._id);
                        // console.log('index - ',idx);
                        if(idx === -1){
                            user.activities.push(act_id);
                            user.save();

                        }
                        // console.log(user.activities);
                        // user.activities = Array.from(new Set(user.activities));
                    }

                    // console.log((new Set(user.activities)).has(activity._id), user._id);
                    
                });
            });



            newActivity.completed.forEach((ele) => {
                User.findOne({_id:ele}, (err, user) => {
                    if(err) throw err;
                    if(!(new Set(user.completed)).has(activity._id)){
                        let act_id = {_id: activity._id};            
                        // user.completed.push(act_id);

                        let idx = user.completed.indexOf(activity._id);
                        // console.log('index - ',idx);
                        if(idx === -1){
                            user.completed.push(act_id);
                            user.save();

                        }
                      
                        // console.log(user.activities);
                        // user.completed = Array.from(new Set(user.completed));
                        
                    }
                });
            });

           

        }
    });


    // User.findById(req.params.id, (err, user) => {
    //                         if(err) throw err;
    //                         console.log(user.activities.indexOf('5dbf358122e5b254d8dc7ec8'));                           
    //                     });

});

router.delete('/:id', (req, res) => {
    res.send("Single activity delete api");
});





module.exports = router;