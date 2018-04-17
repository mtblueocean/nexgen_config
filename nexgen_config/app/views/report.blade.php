<!DOCTYPE html>
<html ng-app="qms">

<head>
<meta http-equiv=Content-Type content="text/html; charset=windows-1252">
<meta name=Generator content="Microsoft Word 12 (filtered)">

    <!-- Bootstrap -->
    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/css/bootstrap.min.css">

    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/angular/font-awesome/css/font-awesome.css">

    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/angular/css/animate.css">

    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/angular/css/report.css">

    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/angular/css/plugins/summernote/summernote.css">

    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/angular/css/plugins/summernote/summernote-bs3.css">

    <link media="all" type="text/css" rel="stylesheet" href="/app/assets/css/parsley.css">


<style>

.bgcon {
	
	width: 700px;
	padding: 10px 10px 10px 10px;
}

.first{
	width: 50%;
	padding: 10px 10px 10px 10px;
	float:left;
}

.two{
	width: 150px;
	padding: 10px 10px 10px 10px;
}

a:link {
    text-decoration: none;
}

a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

a:active {
    text-decoration: underline;
}

.clear {
    clear:both;
}
</style>
    <!-- Bootstrap -->


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
<body lang=EN-US link=blue vlink=purple ng-controller="ProposalCtrl">

<form method="get" id="products_form">
	<!--word-->
	
	<div >
	<img src="assets/images/report/0.png" width="800px" >
	<img src="assets/images/report/1.png" width="800px" >
	<img src="assets/images/report/2.png" width="800px" >
	<img src="assets/images/report/3.png" width="800px" >
	<img src="assets/images/report/4.png" width="800px" >
	
		<!-- Sites -->
<br>
<br>
<br>
<br><br>
<br><br>
<br>	
	<img src="assets/images/report/header.jpg" width="800px" style="margin-left:40px" >	
	<div >
		<div >
			<div >
				<div >
					<!-- -->
						<div>
							<p class=MsoNormal align=center style='margin-right:14.2pt;text-align:center;text-indent:.25in'>
							<span lang=EN-AU style='font-size:16.0pt;font-family:"Calibri","sans-serif";
							color:red'>Brief Overview</span>
							</p>
							<p class=MsoNormal style='margin-right:14.2pt;margin-left:20px'><b><span lang=EN-AU style='font-size:14.0pt;font-family:"Calibri","sans-serif";color:#595959'>Proposed Solution:</span></b>
							</p>
						</div>
					<!-- -->
					<div >
						<div >
							<!-- panel accordion1 -->
							<div >
								<div  ng-repeat="site in proposal.sites" on-finish-render="ngRepeatFinished">
									<div class=MsoNormal style='margin-right:14.2pt;margin-left:20px' >
										<h5 >
										<a data-toggle="collapse" style='font-size:14.0pt;font-family:"Calibri","sans-serif";color:#595959' data-parent="#accordion1" href="/proposal/new#collapse{{$index}}">Site {{$index}}</a>
										</h5>
									</div>
									<div id="collapse{{$index}}" >
										<div >
											<div >
												<!-- panel accordion2 -->
												<div id="accordion-{{$index}}">
													<div style='margin-left:140px;margin-top:21px;' ng-repeat="catf in categories | filter:{parent:1}">
														
														<div id="collapse{{catf.id}}{{$parent.$index}}" >
															
																
																<div ng-repeat="item in proposal.products | filter:{scs:$parent.$index+'-'+catf.id}" >
																	
																	<div class="bgcon" ng-show="item.show=='1'"  >
																		<div  class="first" ng-bind-html="item.desc | unsafe"  >{{item.desc}}</div>
																		
																		<img  class="two" ng-src="{{item.imaged || '//:0'}}" />
																	</div>
																	
																	<div class="clear"></div>
																
																</div>
																</div>
															
															<!-- table -->
														</div>
													</div>
												</div>
											</div>
											<!-- panel accordion2 -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- panel accordion1 -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<img src="assets/images/report/footer.jpg" width="800px" style="margin-left:40px" >
<br>
<br>
<br>
<br><br>
<br><br>
<br>
<!-- Sites -->
	<div class="wrapper wrapper-content animated fadeInRight" style="display:none;">
	<div class="row">
		<div class="col-lg-12">
			<div class="ibox float-e-margins">
				<div class="ibox-content">
					<div class="ibox-title">
						<h5></h5>
					</div>
						
					<div class="form-group pull-right">
						<label class="col-sm-4 control-label">Total {{level_weekly}} </label>
						<div class="col-sm-4">
							<input type="text" style="width: 70px;" class="form-control m-b" ng-model="grant_total" readonly="">
						</div>
					</div>
					<div class="form-group">
						<div class="col-sm-3">
							<a class="btn btn-primary btn-sm" data-toggle="tooltip" data-placement="top" title="Save" ng-click="save()">
							<i class="fa fa-new"></i> Save </a>
							<a class="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Save">
							<i class="fa fa-new"></i> Cancel </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<img src="assets/images/report/headerReport.jpg" width="800px" style="margin-left:40px" >

<!-- detail -->
<div class="row">
	<div class="col-lg-6">
		<div class="wrapper wrapper-content animated fadeInRight">
			<div class="ibox-content p-xl">

				<div class="table-responsive m-t">
					<table class="table invoice-table">
						<thead>
						<tr>
							<th>Current Situation</th>
							<th></th>
							<th></th>
							<th>Proposed</th>
							<th>Montly Discount</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td><div><strong>Call Usage</strong></div>
								<small>Desc</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit1"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop1"></span></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.mdis1"></span></td>
						</tr>
						<tr>
							<td><div><strong>Misc Calls</strong></div>
								<small>Desc.
								</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit2"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop2"></span></td>
							<td class="nowrap"></td>
						</tr>
						<tr>
							<td><div><strong>Voice Lines</strong></div>
								<small>Desc.</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit3"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop3"></span></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.mdis2"></span></td>
						</tr>
						
						<tr>
							<td><div><strong>Dedicated Lines</strong></div>
								<small>(fax eftpos, alarm etc).</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit4"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop4"></span></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.mdis3"></span></td>
						</tr>
						
						<tr>
							<td><div><strong>Mobile plans</strong></div>
								<small>Desc.</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit5"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop5"></span></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.mdis4"></span></td>
						</tr>
						
						<tr>
							<td><div><strong>Internet</strong></div>
								<small>Desc.</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit6"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop6"></span></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.mdis5"></span></td>
						</tr>
						
						<tr>
							<td><div><strong>Equipment rental</strong></div>
								<small>Desc.</small></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.csit7"></span></td>
							<td></td>
							<td class="nowrap">$ &nbsp;<span class="pull-right"><input type="text" class="form-control m-b" ng-model="proposal.prop7"></span></td>
							<td class="nowrap"></td>
						</tr>
						
						<tr>
							<td><div><strong></strong></div>
								<small></small></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						
						<tr>
							<td><div><strong>Total</strong></div>
								<small></small></td>
							<td class="nowrap">$ {{ parseInt(proposal.csit1,10) + parseInt(proposal.csit2,10) + parseInt(proposal.csit3,10) + parseInt(proposal.csit4,10) + parseInt(proposal.csit5,10) + parseInt(proposal.csit6,10) + parseInt(proposal.csit7,10)}}</td>
							<td></td>
							<td class="nowrap">$ {{ parseInt(proposal.prop1,10) + parseInt(proposal.prop2,10) + parseInt(proposal.prop3,10) + parseInt(proposal.prop4,10) + parseInt(proposal.prop5,10) + parseInt(proposal.prop6,10) + parseInt(proposal.prop7,10) }}</td>
							<td class="nowrap">$ {{ parseInt(proposal.mdis1,10) + parseInt(proposal.mdis2,10) + parseInt(proposal.mdis3,10) + parseInt(proposal.mdis4,10) + parseInt(proposal.mdis5,10)  }}</td>
						</tr>

						</tbody>
					</table>
				</div><!-- /table-responsive -->

				<table class="table invoice-total">
					<tbody>
					<!--tr>
						<td><strong>Sub Total :</strong></td>
						<td>
						
						$1026.00</td>
					</tr>
					<tr>
						<td><strong>TAX :</strong></td>
						<td>$235.98</td>
					</tr-->
					<tr>
						<td><strong>TOTAL SERVICES :</strong></td>
						<td>
						{{ parseInt(proposal.csit1,10) + parseInt(proposal.csit2,10) + parseInt(proposal.csit3,10) + parseInt(proposal.csit4,10) + parseInt(proposal.csit5,10) + parseInt(proposal.csit6,10) + parseInt(proposal.csit7,10) + parseInt(proposal.prop1,10) + parseInt(proposal.prop2,10) + parseInt(proposal.prop3,10) + parseInt(proposal.prop4,10) + parseInt(proposal.prop5,10) + parseInt(proposal.prop6,10) + parseInt(proposal.prop7,10) + parseInt(proposal.mdis1,10) + parseInt(proposal.mdis2,10) + parseInt(proposal.mdis3,10) + parseInt(proposal.mdis4,10) + parseInt(proposal.mdis5,10) | currency:"AUD $":0 }}
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>				
<!-- detail -->
	<img src="assets/images/report/footerReport.jpg" width="800px" >

	<img src="assets/images/report/7.png" width="800px" >
	<img src="assets/images/report/8.png" width="800px" >
	</div>

	<!--word-->
</form>

    <!-- Include all compiled plugins (below), or include individual files as needed -->
      <$$ HTML::script( '/assets/angular/js/jquery/jquery-2.1.1.min.js') $$>
      
      <$$ HTML::script( '/assets/js/angular.min.js') $$>
      <$$ HTML::script( '/assets/js/angular-resource.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/ui-router/angular-ui-router.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/plugins/metisMenu/jquery.metisMenu.js') $$>
      <$$ HTML::script( '/assets/angular/js/plugins/summernote/summernote.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/plugins/summernote/angular-summernote.min.js') $$>
      <$$ HTML::script( '/assets/angular/js/bootstrap/ui-bootstrap-tpls-0.11.0.min.js') $$>
      <$$ HTML::script( '/assets/js/parsley.js') $$>
      <$$ HTML::script( '/assets/js/angular-file-upload.js') $$>

      <$$ HTML::script( '/assets/js/report.js') $$>
      <$$ HTML::script( '/assets/js/config.js') $$>
      <$$ HTML::script( '/assets/js/resources.js') $$>

      <$$ HTML::script( '/assets/js/directives.js') $$>
      <$$ HTML::script( '/assets/js/controllers.js') $$>
	  
</body>

</html>
