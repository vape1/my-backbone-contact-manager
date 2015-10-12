<?php
    $data = $_POST ? : json_decode(file_get_contents('php://input')) ? :$_GET ? : false;

    create($data);

    function create($params)
    {
        $file = "contacts.json";
        $string = file_get_contents($file);
        $contacts = (array)json_decode($string);
        $max_id = 0;

        foreach($contacts as $k => $contact) {
            if($contact->id > $max_id) {
                $max_id = $contact->id;
            }
        }

        $max_id++;
        $new_contact = array('id'=>$max_id,'name'=>$params->name,'phoneNumber'=>$params->phoneNumber);
        array_push($contacts, $new_contact);
        $contacts_json = json_encode(array_values($contacts));

        file_put_contents($file,$contacts_json);

        echo json_encode($new_contact);
    }

