$(document).ready(function () {
    $("#btnAdd").click(function () {
        var tableName = $("#txtTableName").val();
        var key = $("#txtKey").val();
        var control = $("#txtControl").val();

        var row = "<tr><td>" + tableName + "</td><td>" + key + "</td><td>" + control + "</td><td><button class='btn btn-primary btn-sm btn-edit'>Edit</button></td></tr>";
        $("#myTable tbody").append(row);

        $("#txtTableName").val("");
        $("#txtKey").val("");
        $("#txtControl").val("");
    });

    $(document).on("click", ".btn-edit", function () {
        var currentRow = $(this).closest("tr");
        var tableName = currentRow.find("td:eq(0)").text();
        var key = currentRow.find("td:eq(1)").text();
        var control = currentRow.find("td:eq(2)").text();

        $("#txtTableName").val(tableName);
        $("#txtKey").val(key);
        $("#txtControl").val(control);

        // Show Update button, hide Add button
        $("#btnUpdate").show();
        $("#btnAdd").hide();

        // Change update functionality
        $("#btnUpdate").off().on("click", function () {
            currentRow.find("td:eq(0)").text($("#txtTableName").val());
            currentRow.find("td:eq(1)").text($("#txtKey").val());
            currentRow.find("td:eq(2)").text($("#txtControl").val());

            // Clear input fields
            $("#txtTableName").val("");
            $("#txtKey").val("");
            $("#txtControl").val("");

            // Show Add button, hide Update button
            $("#btnAdd").show();
            $("#btnUpdate").hide();
        });
    });

    $("#btnGenerate").click(function () {
        var table = document.getElementById("myTable");
        var jqCode = "";
        jqCode = jqCode + "// Code for Save Btn" + "\n";
        jqCode = jqCode + "$.post(\"code.php\",{" + "\n";
        jqCode = jqCode + " 'cmd':'Insert'," + "\n";
        jqCode = jqCode + "" + "\n";
        for (var i = 1, row; row = table.rows[i]; i++) {
            var key = row.cells[1].innerText;
            var control = row.cells[2].innerText;
            jqCode = jqCode + " '" + key + "':$(\"#" + control + "\").val()," + "\n";
        }
        jqCode = jqCode + " },function(result){" + "\n";
        jqCode = jqCode + " result=JSON.parse(result);" + "\n";
        jqCode = jqCode + "alert(result.message);" + "\n";
        jqCode = jqCode + "});" + "\n";
        $("#txtJQcode").val(jqCode);
    });
});
