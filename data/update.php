<?php

    $data = $_POST ? : json_decode(file_get_contents('php://input')) ? :$_GET ? : false;

    update($data);

    function update($params)
    {
        $file = "contacts.json";
        $string = file_get_contents($file);
        $contacts = (array)json_decode($string);
        $update_contact = [];

        foreach($contacts as $k => $contact) {
            if($contact->id == $params->id) {
                $contacts[$k]->name = $params->name;
                $contacts[$k]->phoneNumber = $params->phoneNumber;
                $update_contact = $contacts[$k];
            }
        }
        $contacts_json = json_encode(array_values($contacts));

        file_put_contents($file,$contacts_json);
        echo json_encode($update_contact);
    }

