var product = function($resource){
    return $resource('product/:product_id', {product_id:'@product_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var category = function($resource){
    return $resource('category/:category_id/:category_level', {category_id:'@category_id', category_level:'@category_level'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false},'getCatBylevel': {method: 'GET', isArray: true}});
}

var financetype = function($resource){
    return $resource('financetype/:financetype_id', {financetype_id:'@financetype_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var typet = function($resource){
    return $resource('typet/:typet_id', {typet_id:'@typet_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var company = function($resource){
    return $resource('company/:company_id', {company_id:'@company_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var salesrep = function($resource){
    return $resource('salesrep/:salesrep_id', {salesrep_id:'@salesrep_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var telemarketer = function($resource){
    return $resource('telemarketer/:telemarketer_id', {telemarketer_id:'@telemarketer_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var winback = function($resource){
    return $resource('winback/:winback_id', {winback_id:'@winback_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var leadsource = function($resource){
    return $resource('leadsource/:leadsource_id', {leadsource_id:'@leadsource_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}


var user = function($resource){
    return $resource('user/:user_id', {user_id:'@user_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}


var config = function($resource){
    return $resource('config/:config_id',{config_id:'@config_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}


var sellprice = function($resource){
    return $resource('sellprice/:id',{id:'@id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}


var rentalprice = function($resource){
    return $resource('rentalprice/:id',{id:'@id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var flexirent = function($resource){
    return $resource('flexirent/:id',{id:'@id'} , {'query': {method: 'GET', isArray: false},'update': {method: 'PUT', isArray: false}});
}


var proposal = function($resource){
    return $resource('proposal/:id',{id:'@id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}


var products = function($resource) { return $resource('proposal/view-products/:id', {id:'@id'} , {'query': { method: 'GET', isArray: false }});
}


var productRules = function($resource) { return $resource('proposal/get-product-rules/:id', {id:'@id'}, {'query':{method:'GET',isArray:true}});
}

var associatedProduct = function($resource){
    
    return $resource('product/:product_id', {product_id:'@product_id'} , {'query': {method: 'GET', isArray: false},'update': {method: 'PUT', isArray: false}});
}

var form = function($resource) {
    return $resource('form/:action', {}, {'update': { method:"POST", params: {action:'create-pdf'}},
                                          'save': { method:"POST", params: {action :'save-data'}},
                                          'show' :{ method: "POST", params : {action : 'show-data'}},
                                          'delete':{ method : "POST", params: {action : 'delete-data'}},
                                          'getScheduleGoods':{ method: "POST", params: {action : 'get-schedule-goods'}},
                                          'downloadForms': {method : "POST", params: {action : 'download-forms'}}                                                          
                                         }
                    );
}

var flashMessage = function($rootScope) {
  var queue = [];
  var currentMessage = "";


  return {
    message:'',
    icon_font:'',
    bg:'',
    header:'',
    setMessage: function(message) {
      if(message.success){
        this.icon_font = 'font-blue';
        this.bg = 'alert-success';
        this.header='Success!';
      } else {
        this.icon_font = 'font-red';
        this.bg        = 'alert-danger';
        this.header    = 'Oops!';
      }
      this.message = message.message;
    },
    getMessage: function() {
      var msg = this.message;
      this.message = '';
      return msg;
    },
    getBg:function(){
      return this.bg;
    },
    getIconFont:function(){
      return this.icon_font;
    },
    getHeaderMessage:function(){
      return this.header;
    }

  };
};

var scheduleGoods = function($resource){
    return $resource('schedule_goods/:schedule_goods_id', {schedule_goods_id:'@schedule_goods_id'} , {'query': {method: 'GET', isArray: true},'update': {method: 'PUT', isArray: false}});
}

var frontierQualification = function($resource){
    return $resource('qualify_address/:address',{address:'@address'});
}

Qms.factory('Product', product);
Qms.factory('ScheduleGoods',scheduleGoods);
Qms.factory('Category', category);
Qms.factory('FinanceType', financetype);
Qms.factory('Typet', typet);
Qms.factory('Company', company);
Qms.factory('Salesrep', salesrep);
Qms.factory('Telemarketer', telemarketer);
Qms.factory('Winback', winback);
Qms.factory('Leadsource', leadsource);
Qms.factory('User', user);
Qms.factory('FlashMessage', flashMessage);
Qms.factory('Config', config);
Qms.factory('SellPrice', sellprice);
Qms.factory('RentalPrice', rentalprice);
Qms.factory('FlexiRent', flexirent);
Qms.factory('Proposal', proposal);
Qms.factory('Products', products);
Qms.factory('ProductRules',productRules);
Qms.factory('AssociatedProduct',associatedProduct);
Qms.factory('Form', form);
Qms.factory('FrontierQualification',frontierQualification);
