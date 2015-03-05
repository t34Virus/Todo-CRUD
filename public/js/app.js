$(function() {
// select all the checkboxes
  $("li .todo input[type=checkbox]").change(function(){
      // get the id of the mongo document
    var doc_id = $(this).data('todo-id');
    
    if( $(this).prop( "checked" ) ){
      // checkbox was checked
      // issue a PUT request to complete_todos route
      $.ajax('/todos/'+doc_id+'/complete', { 
          type : "PUT"
      });
    }else{
    // checkbox was unchecked
    // issue a PUT request to uncomplete_todos route
      $.ajax('/todos/'+doc_id+'/incomplete', { 
        type : "PUT"
      });
    }
  }).each(function(i, obj) {
    //check each checkbox that's completed
    if ($(obj).data("completed")){
      $(obj).prop( "checked", true );
    }
  });
});