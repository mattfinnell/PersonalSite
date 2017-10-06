
def get_classes_of_type(module, class_type):
    object_names = filter(
        lambda x : issubclass(type(getattr(module, x)), class_type),
        module.__dict__
    )

    return [getattr(module, object_name) for object_name in object_names]
