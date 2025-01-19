class PhoneBookService {
    constructor() {
        this.baseUrl = "/api/v1/contacts";
    }

    get(url, params) {
        return axios.get(url, {
            params
        }).then(response => response.data);
    }

    post(url, body) {
        return axios.post(url, body).then(response => response.data);
    }

    delete(url, body) {
        return axios.delete(url, {data: body}).then(response => response.data);
    }

    put(url, body) {
        return axios.put(url, body).then(response => response.data);
    }

    getContacts(search) {
        return this.get(this.baseUrl, {search});
    }

    createContact(contact) {
        return this.post(this.baseUrl, contact);
    }

    deleteContacts(body) {
        return this.delete(this.baseUrl, body);
    }

    editContact(contact, id) {
        return this.put(`${this.baseUrl}/${id}`, contact);
    }
}

function Contact(id, firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
}

Vue.createApp({
    data() {
        return {
            service: new PhoneBookService(),
            contacts: [],

            firstName: "",
            lastName: "",
            phoneNumber: "",

            isFirstNameInvalid: false,
            isLastNameInvalid: false,
            isPhoneNumberInvalid: false,

            search: "",

            currentContact: null,
            editContactId: "",
            editFirstName: "",
            editLastName: "",
            editPhoneNumber: "",

            isEditedFirstNameInvalid: false,
            isEditedLastNameInvalid: false,
            isEditedPhoneNumberInvalid: false,

            selectedContactsIds: [],
            isSelectedAll: false,

            editModal: null,
            deleteModal: null,

            phonePattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
        };
    },

    mounted() {
        this.editModal = this.modalInstance = new bootstrap.Modal(document.getElementById("editModal"));
        this.deleteModal = this.modalInstance = new bootstrap.Modal(document.getElementById("deleteModal"));

        this.getContacts();
    },

    computed: {
        selectAll: {
            get: function () {
                if (this.contacts) {
                    return this.selectedContactsIds.length === this.contacts.length;
                } else {
                    return false;
                }
            },

            set: function (value) {
                const selectedContactsIds = [];

                if (value) {
                    this.contacts.forEach(function (contact) {
                        selectedContactsIds.push(contact.id);
                    });
                }

                this.selectedContactsIds = selectedContactsIds;
            }
        }
    },

    methods: {
        getContacts() {
            this.service.getContacts(this.search)
                .then(contacts => {
                    this.contacts = contacts;
                })
                .catch(error => {
                    alert(`Не удалось загрузить контакты ${error.response.data.message}`);
                });
        },

        createContact() {
            if (!this.validateCreateFields()) {
                return;
            }

            const contact = new Contact(
                null,
                this.firstName.trim(),
                this.lastName.trim(),
                this.phoneNumber.trim());

            this.service.createContact(contact)
                .then(response => {
                    if (response.status !== "created") {
                        alert(`Ошибка создания контакта: "${response.message}"`);
                    } else {
                        this.firstName = "";
                        this.lastName = "";
                        this.phoneNumber = "";

                        this.isLastNameInvalid = false;
                        this.isFirstNameInvalid = false;
                        this.isPhoneNumberInvalid = false;
                    }

                    this.getContacts();
                })
                .catch(error => {
                    alert(`Не удалось создать контакт: "${error.response.data.message}"`);
                });
        },

        validateEditFields() {
            let isAllFieldsValid = true;

            if (!this.validateText(this.editFirstName)) {
                isAllFieldsValid = false;
                this.isEditedFirstNameInvalid = true;
            } else {
                this.isEditedFirstNameInvalid = false;
            }

            if (!this.validateText(this.editLastName)) {
                isAllFieldsValid = false;
                this.isEditedLastNameInvalid = true;
            } else {
                this.isEditedLastNameInvalid = false;
            }

            if (!this.validatePhoneNumber(this.editPhoneNumber)) {
                isAllFieldsValid = false;
                this.isEditedPhoneNumberInvalid = true;
            } else {
                this.isEditedPhoneNumberInvalid = false;
            }

            return isAllFieldsValid
        },

        validateCreateFields() {
            let isAllFieldsValid = true;

            if (!this.validateText(this.firstName)) {
                isAllFieldsValid = false;
                this.isFirstNameInvalid = true;
            } else {
                this.isFirstNameInvalid = false;
            }

            if (!this.validateText(this.lastName)) {
                isAllFieldsValid = false;
                this.isLastNameInvalid = true;
            } else {
                this.isLastNameInvalid = false;
            }

            if (!this.validatePhoneNumber(this.phoneNumber)) {
                isAllFieldsValid = false;
                this.isPhoneNumberInvalid = true;
            } else {
                this.isPhoneNumberInvalid = false;
            }

            return isAllFieldsValid
        },

        validateText(text) {
            return text.trim().length !== 0;
        },

        validatePhoneNumber(phoneNumber) {
            return this.phonePattern.test(phoneNumber);
        },

        deleteContact(contact) {
            //Сделано чтобы работало удаление без выбора галочки
            this.selectedContactsIds.push(contact.id);
            this.selectedContactsIds = Array.from(new Set(this.selectedContactsIds));

            this.service.deleteContacts(this.selectedContactsIds)
                .then(response => {
                    if (response.status !== "success") {
                        alert(response.message);
                    } else {
                        this.selectedContactsIds = [];
                        this.deleteModal.hide();
                    }

                    this.getContacts();
                })
                .catch(error => {
                    alert(`Не удалось удалить контакт: "${error.response.data.message}"`);
                });
        },

        getCurrentContact(contact) {
            this.currentContact = contact;
            this.editFirstName = contact.firstName
            this.editLastName = contact.lastName
            this.editPhoneNumber = contact.phoneNumber
        },

        editContact(contact) {
            if (!this.validateEditFields()) {
                return;
            }

            this.editContactId = contact.id
            const editedContact = new Contact(
                this.id,
                this.editFirstName,
                this.editLastName,
                this.editPhoneNumber);

            this.service.editContact(editedContact, contact.id)
                .then(response => {
                    if (response.status !== "success") {
                        alert(response.message);
                    } else {
                        this.editContactId = "";
                        this.editFirstName = "";
                        this.editLastName = "";
                        this.editPhoneNumber = "";

                        this.editModal.hide();
                    }

                    this.getContacts();
                })
                .catch(error => {
                    alert(`Не удалось отредактировать контакт: "${error.response.data.message}"`);
                });
        }
    }
}).mount('#app');