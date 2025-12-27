package lifeplusapi

// Helper functions for working with optional pointer fields in the SDK

// DerefString safely dereferences a string pointer, returns empty string if nil
func DerefString(v *string) string {
	if v == nil {
		return ""
	}
	return *v
}

// DerefInt32 safely dereferences an int32 pointer, returns 0 if nil
func DerefInt32(v *int32) int32 {
	if v == nil {
		return 0
	}
	return *v
}

// DerefInt64 safely dereferences an int64 pointer, returns 0 if nil
func DerefInt64(v *int64) int64 {
	if v == nil {
		return 0
	}
	return *v
}

// DerefFloat32 safely dereferences a float32 pointer, returns 0.0 if nil
func DerefFloat32(v *float32) float32 {
	if v == nil {
		return 0.0
	}
	return *v
}

// DerefFloat64 safely dereferences a float64 pointer, returns 0.0 if nil
func DerefFloat64(v *float64) float64 {
	if v == nil {
		return 0.0
	}
	return *v
}

// DerefBool safely dereferences a bool pointer, returns false if nil
func DerefBool(v *bool) bool {
	if v == nil {
		return false
	}
	return *v
}

// Float32ToFloat64 converts float32 pointer to float64, returns 0.0 if nil
func Float32ToFloat64(v *float32) float64 {
	if v == nil {
		return 0.0
	}
	return float64(*v)
}
