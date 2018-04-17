<?php
class FormController extends \BaseController
{
    public function createPdf()
    {
        set_time_limit(0);
        $forms = Request :: input("htmlData");
        $userDetails = Request :: input("userDetails");
        $account = Request :: input("account");
        $fromEmail = "noreply@nexgenconfigapp.xyz";
        $fromName = "Nexgen";
        $subject = 'Welcome to Nexgen';
        $toEmail = $userDetails["email"];
        $toName = $userDetails["name"];
        $accEmail = $account['email'];
        $accName = $account['name'];
        $mailData = [
            'user' => $toName,
            'userEmail' => $toEmail,
            'name' => $fromName,
            'email'=> $fromEmail
        ];

        $paths = array();

        if (Auth::user()) {
            $managerEmail = Auth::user()->manageremail;
        }

        if (is_array($forms) || is_object($forms)) {
            foreach ($forms as $form) {
                $pdf = new mPDF('utf-8', 'A4');
                $pdf->WriteHTML($form['html']);
                $data = array("pdf" => $pdf->Output("assets/files/".$form['fileName']));
                $paths[] = "assets/files/".$form['fileName'];
            }
        }

        if (strpos($form['fileName'],'draft')!==false){
          $emailTemplate = 'emails.form.draftforms';
        } else {
          $emailTemplate = 'emails.form.forms';
        }
        Mail::send($emailTemplate, $mailData, function($message) use ($subject, $paths, $accEmail, $managerEmail)
        {
            $message->to($accEmail);
            if ($accEmail!='info@somelongcompany.com.au'){
              $message->cc('william@webmarketers.com.au')
                    ->cc('JamesHarb@nexgen.com.au')
                    ->cc('ElieAyoub@nexgen.com.au')
                    ->cc('developer@businesstelecom.com.au')
                    ->cc('QA@nexgen.com.au');
            }
            else {
              $message->cc('william@webmarketers.com.au')
                    ->cc('JamesHarb@nexgen.com.au')
                    ->cc('ElieAyoub@nexgen.com.au')
                    ->cc('developer@businesstelecom.com.au');
            }
            if (!empty($managerEmail)) {
                $message->cc($managerEmail);
            }

            $message->subject($subject);

            foreach ($paths as $path) {
                $message->attach($path);
            }
        });

        if (Mail::failures()) {
            Log::debug(Mail::failures());
            return Response::json(array("success" => "fail"));
        } else {
            return Response::json(array("success" => "success"));
        }
    }

    public function saveData()
    {
        $data = Request :: input("data");
        $user = Request :: input("user");
        $status = Request :: input("type");

         //No credit card info to be saved in the server.
        isset($data["aCardNumber"]) ? $data["aCardNumber"] = "" : "";
        isset($data["aCardExpiry"]) ? $data["aCardExpiry"] = "" : "";
        isset($data["aCardName"]) ? $data["aCardName"] = "" : "";
        isset($data["aCardType"]) ? $data["aCardType"] = "" : "";

        $formData = serialize($data);
        $editId = Request :: input("editId");

        $fileName = serialize(Request::input("fileName"));
        if ($editId) {
            $fd = FormData::find($editId);
        } else {
            $fd = new FormData();
            $fd->user_id = $user;
        }

        try {
            // $fd->user_id = $user;
            $fd->form_data = $formData;
            $fd->status = $status;
            $fd->files = $fileName;

            $fd->save();

            return Response::json(array("success" => "success", "editId"=> $fd->id));
        } catch (Exception $ex) {
            return Response ::json(array("success" => "false", "message" => $ex->getMessage()));
        }
    }
    public function downloadForms()
    {
        $id = Request :: input("id");
        if ($id) {
           $data = FormData::find($id);
           $files = unserialize($data['files']);
           return Response::json(array("success" => "success", "files" => $files));
        }

    }
    public function showForms()
    {
        $id = Request :: input("id");
        $user_id = Request :: input("user");
        if ($id) {
           $data = FormData::find($id);
           $forms['data'] = unserialize($data['form_data']);
           $forms['id'] = $data['id'];
           return Response::json(array("success" => "success", "formData" => $forms));
        } else {
            $userStatus = User::find($user_id)["type"];
            if ($userStatus == "admin") {
                $data = DB::table('form_data')->orderBy('created_at', "desc")
                                              ->get();
            } else {
                $data = DB::table('form_data')->orderBy('created_at', "desc")
                                              ->where('user_id', $user_id)
                                          ->get();
            }
            $forms = array();
            foreach ($data as $d) {
               $item['creator_id'] = $d->user_id;
               $item['creator_name'] = User::find($d->user_id)["username"];
               //echo $d->form_data;c
               $item['data'] = unserialize($d->form_data);
               $item['created_at'] = $d->created_at;
               $item['status'] = $d->status;
               $item['id'] = $d->id;
               if (array_key_exists('type',$item['data'])) {
                    $types = $item['data']['type'];
                    $formNameStr = "";
                    foreach ($types as $i => $tp) {
                        if ($tp == true) {
                           $formNameStr.= $i.", ";
                        }
                    }

                    $item['types'] = substr_replace($formNameStr,"","-2");
               }

               $forms[] = $item;
            }
            return Response::json(array("success" => "success", "formData" => $forms, "userStatus" => $userStatus));
        }
    }

    public function deleteForm()
    {
       $id = Request :: input("id");
       if ($id) {
           $data = FormData::find($id);
           $data->delete();
           return Response::json(array("success" => true, "message" => "item Deleted"));
       } else {
           return Response::json(array("success" => false, "message" => "Some Error!"));
       }
    }

    public function getScheduleGoods()
    {
      $schedule_goods = ScheduleGoods::all();
      $goodsList = array();
      foreach ($schedule_goods as $sg) {
        if ($sg->group != 'Misc') {
          $goodsList[] = array(
                               "group" => $sg->group,
                               "item"=> $sg->group." ".$sg->item,
                               "model" => $sg->model,
                               "cpiBw" => $sg->cpiBw,
                               "cpiColour" => $sg->cpiColour
                              );
        }
        else {
            $goodsList[] = array(
                               "group" => $sg->group,
                               "item"=> $sg->item,
                               "model" => $sg->model,
                               "cpiBw" => $sg->cpiBw,
                               "cpiColour" => $sg->cpiColour
                              );
        }
      }
       return Response::json(array("success" => true, "goods" => $goodsList));
    }

}
