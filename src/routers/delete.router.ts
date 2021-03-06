import express from 'express'
import { PrismaClient } from '@prisma/client'

let router = express.Router();
const prisma = new PrismaClient;

router.get("/:id", async (req, res) => {
    await prisma.ticketkauf.delete({
        where: {
            id: Number(req.params.id)
        }
    })

    if (req.session != undefined) {
        if (req.session.loggedIn) {   
            if (req.session.username === 'admin') {
                res.redirect("/ticket-anzeigen");
            } else {
                res.send('You are not privileged to view this page!');
            }
        } else {
          res.send('Please login to view this page!');
        }
    } 
});

export = router;