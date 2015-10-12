<?php

    delete($_GET);

    function delete($params)
    {
        $file = "contacts.json";
        $string = file_get_contents($file);
        $contacts = (array)json_decode($string);

        foreach($contacts as $k => $contact) {
            if($contact->id == $params['id']) {
                unset($contacts[$k]);
            }
        }
        $contacts_json = json_encode(array_values($contacts));

        file_put_contents($file,$contacts_json);
    }
