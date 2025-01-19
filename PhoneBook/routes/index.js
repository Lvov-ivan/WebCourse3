let express = require('express');
let router = express.Router();

let contacts = [];
let currentContactId = 1;

router.get("/api/v1/contacts", function (req, res) {
    const search = (req.query.search || "").toLowerCase();

    if (search.length === 0) {
        res.send(contacts);
    } else {
        res.send(contacts.filter(c => c.firstName.toLowerCase().includes(search)
            || c.lastName.toLowerCase().includes(search)
            || c.phoneNumber.toLowerCase().includes(search)));
    }
});

router.post("/api/v1/contacts", function (req, res) {
    const contact = req.body;

    if (!contact.firstName) {
        res.send({
            status: "error",
            message: "Поле \"Фамилия\" пустое"
        })
            .status(400);
        return;
    }

    if (!contact.lastName) {
        res.send({
            status: "error",
            message: "Поле \"Имя\" пустое"
        })
            .status(400);
        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            status: "error",
            message: "Поле \"Телефон\" пустое"
        })
            .status(400);
        return;
    }

    if (contacts.some(c => c.phoneNumber.toLowerCase() === contact.phoneNumber.toLowerCase())) {
        res.send({
            status: "error",
            message: "Такой номер уже существует"
        })
            .status(400);
        return;
    }

    contact.id = currentContactId
    currentContactId++

    contacts.push(contact);

    res.send({
        status: "created",
        message: null
    })
        .status(201);

});

router.put("/api/v1/contacts/:id", function (req, res) {
    const id = Number(req.params.id);
    const contact = req.body;

    if (!contact.firstName) {

        res.send({
            status: "error",
            message: "Поле \"Фамилия\" пустое"
        })
            .status(401);
        return;
    }

    if (!contact.lastName) {
        res.send({
            status: "error",
            message: "Поле \"Имя\" пустое"
        })
            .status(400);
        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            status: "error",
            message: "Поле \"Телефон\" пустое"
        })
            .status(400);
        return;
    }

    const phoneMatchIndex = contacts.findIndex(c => c.phoneNumber.toLowerCase() === contact.phoneNumber.toLowerCase())

    if (contacts.findIndex(c => c.phoneNumber.toLowerCase() === contact.phoneNumber.toLowerCase()) !== -1
        && id !== contacts[phoneMatchIndex].id) {
        res.status(400)
            .send({
                status: "error",
                message: "Такой номер уже существует"
            });
        return;
    }

    const contactIndex = contacts.findIndex(c => c.id === id);

    if (contactIndex < 0) {
        res.send({
            status: "error",
            message: "Контакта не существует" + contactIndex
        })
            .status(404);
    }

    contacts.splice(contactIndex, 1, contact);
    contact.id = id

    res.send({
        status: "success",
        message: null
    })
        .status(200);
});

router.delete("/api/v1/contacts", function (req, res) {
    const contactIds = req.body;

    if (contactIds !== null && contactIds.length > 0) {
        for (const contactId of contactIds) {
            const contactIndex = contacts.findIndex(c => c.id === contactId);
            if (contactIndex >= 0) {
                contacts.splice(contactIndex, 1);
            } else {
                res.send({
                    status: "error",
                    message: `Не удалось найти контакт с индексом ${contactId}`
                })
                    .status(404);

                break;
            }
        }

        res.send({
            status: "success",
            message: null
        })
            .status(200);
    } else {
        res.send({
            status: "error",
            message: "Не удалось найти контакт"
        })
            .status(404);
    }
});

module.exports = router;