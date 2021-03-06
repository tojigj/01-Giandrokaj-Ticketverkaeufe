import express from 'express'
import { PrismaClient } from '@prisma/client'

let router = express.Router();
const prisma = new PrismaClient;

router.get("/", async (req, res) => {
    const konzert = await prisma.konzert.findMany({});
    const tickets = await prisma.ticketkauf.findMany({});

    if (req.session != undefined) {
        if (req.session.loggedIn) {
            if (req.session.username === 'admin') {
                res.render("showSales", {tickets, konzert});
            } else {
                res.send('You are not privileged to view this page!');
            }
        } else {
          res.send('Please login to view this page!');
        }
    } 
});

export = router;