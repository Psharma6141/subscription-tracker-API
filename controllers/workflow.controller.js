import dayjs from 'dayjs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

import Subscription from '../model/subscription.model.js';

const REMINDERS = [7,5,3,2,1];

export const sendReminder = serve(async (context) =>{
    console.log("Subscription fetched")
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active')  return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping worlflow`);
        return;
    }

    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day'); 
        //renewal date= 22 jan, reminder date= 15, 17, 19, 20,21

        if(reminderDate.isAfter(dayjs())){
         await sleepUntilReminder(context, `Reminder ${daysBefore} day before`, reminderDate )
        };

         await triggerReminder(context, `Reminder ${daysBefore} day before`);
    }

});



const fetchSubscription = async(context, subscriptionId) =>{
    return await context.run('get subscription', async ()=>{
    return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}


const sleepUntilReminder = async (context, label, date) =>{
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());

}


const triggerReminder = async(context, label)=>{
    return await context.run(label, () =>{
        console.log(`Triggering ${label} reminder`);
        //Send email, SMS, push notifications...
    })
}