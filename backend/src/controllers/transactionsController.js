import { sql } from "../config/db.js";

export async function getTransactions(req,res){
        try {
            const { userId } = req.params;
            const transaction=await sql`select * from transactions where user_id=${userId} order by created_at desc`;
            res.status(200).json(transaction);
        } catch (error) {
             console.log("error creating in transaction",error)
            res.status(500).json({message:"internal server error"})
        }
    
}

export async function createTransaction(req,res){
        try {
            const {title, amount,category,user_id} = req.body;
            
            if(!title || !user_id || !category || amount == undefined){
                return res.status(400).json({message: "all fields are required"});
            }
    
            const transaction= await sql `INSERT INTO transactions(user_id,title,amount,category)
            VALUES (${user_id},${title},${amount},${category})
            RETURNING *`
    
            console.log(transaction);
    
            res.status(201).json(transaction[0])
    
        } catch (error) {
            console.log("error creating in transaction",error)
            res.status(500).json({message:"internal server error"})
        }
}

export async function deleteTransaction(req,res){
        try {
            const { Id } = req.params;
            if(isNaN(parseInt(Id))){
                return res.status(400).json({message:"invalid idea"});
            }
            const result=await sql`delete from transactions where id=${Id} returning *`;
            if(result.length==0){
                return res.status(404).json({message:"transaction not found"});
            }
            res.status(200).json({message:"transaction deleted successfully"});
        } catch (error) {
            console.log("error creating in transaction",error)
            res.status(500).json({message:"internal server error"})
        }
}

export async function getSummaryByUserId(req,res){
    try {
        const {userId}=req.params;
         const balanceRes=await sql` select coalesce(sum(amount),0) as balance from transactions where user_id= ${userId}`;
         const incomeRes= await sql`select coalesce(sum(amount),0) as income from transactions where user_id=${userId} AND amount>0`;
         const expensesRes= await sql`select coalesce(sum(amount),0) as expense from transactions where user_id=${userId} AND amount<0`;

         res.status(200).json({
            balance: balanceRes[0].balance,
            income: incomeRes[0].balance,
            expense:expensesRes[0].balance
         });
    } catch (error) {
        console.log("error creating in transaction",error);
        res.status(500).json({message:"internal server error"});
    }

}