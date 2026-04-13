from app.models.activity_log import ActivityLog

def log_activity(db, user_id, action, details=""):
    log = ActivityLog(
        user_id=user_id,
        action=action,
        details=details
    )
    db.add(log)
    db.commit()