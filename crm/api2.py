import frappe
from frappe import _

@frappe.whitelist()
def create_Suits(**kwargs):
    """Create a new Suit record"""
    try:
        data = frappe._dict(kwargs)

        required_fields = ["name1"]
        for field in required_fields:
            if not data.get(field):
                frappe.throw(_("{0} is required").format(field))

        suit = frappe.new_doc("Suits")
        suit.update({
            "name1": data.get("name1"),
            "scope_of_work": data.get("scope_of_work"),
            "entry_date": data.get("entry_date"),
            "client": data.get("client"),
            "client_role": data.get("client_role"),
            "internal_reference_number": data.get("internal_reference_number"),
            "priority": data.get("priority"),
            "opponent": data.get("opponent"),
            "opponent_role": data.get("opponent_role")
        })

        suit.insert(ignore_permissions=True)

        return {
            "name": suit.name,
            "message": _("Suit created successfully")
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Failed to create Suit"))
        frappe.throw(_("Failed to create Suit. Error: {0}").format(str(e)))

@frappe.whitelist()
def delete_suit(name):
    try:
        name = name.strip()
        
        if frappe.db.exists("Suits", name):
            frappe.delete_doc("Suits", name)
            frappe.db.commit()
            return {"message": "تم حذف الدعوى بنجاح"}
        else:
            return {"error": f"لم يتم العثور على الدعوى بهذا الاسم: {name}"}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Error in delete_suit")
        return {"error": f"فشل حذف الدعوى: {str(e)}"}

# crm/api2.py

import frappe
from frappe import _

@frappe.whitelist()
def get_suit(name):
    """
    Fetch a suit by its system name (ID).
    """
    if not name:
        frappe.throw(_("Suit ID is required"))

    suit = frappe.get_doc("Suits", name)
    return suit.as_dict()


@frappe.whitelist()
def update_suit(**kwargs):
    """
    Update an existing suit with new data from frontend.
    Expects all fields in kwargs.
    """
    name = kwargs.get("name")
    if not name:
        frappe.throw(_("Suit ID is required"))

    suit = frappe.get_doc("Suits", name)

    # Update all passed fields, including name1
    for key, value in kwargs.items():
        if key != "name" and hasattr(suit, key):
            setattr(suit, key, value)

    suit.save()
    frappe.db.commit()
    return {"message": _("Suit updated successfully")}
